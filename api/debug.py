import requests
import json

def get_XAF_USDT_rate():
    # Binance P2P API 接口
    url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search"

    # 请求参数（查 USDT，法币为 XAF，获取卖家报价）
    payload = {
        "asset": "USDT",
        "fiat": "XAF",
        "page": 1,
        "rows": 20,
        "tradeType": "SELL",   # 卖家卖USDT，你买入
        "payTypes": ["MTNMOBILEMONEY","MoMoNew","MoMo"]         # 可指定支付方式，例如["MTN_MOBILE_MONEY"]
    }

    # 请求头
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"  # 模拟浏览器防止被屏蔽
    }

    # 发起 POST 请求
    response = requests.post(url, headers=headers, json=payload)

    rates = []
    # 检查响应状态
    if response.status_code == 200:
        data = response.json()
        
        # 提取报价信息
        for item in data["data"]:
            price = item["adv"]["price"]
            seller = item["advertiser"]["nickName"]
            available = item["adv"]["surplusAmount"]
            min_limit = item["adv"]["minSingleTransAmount"]
            max_limit = item["adv"]["maxSingleTransAmount"]
            pay_methods = [p["payType"] for p in item["adv"]["tradeMethods"]]

            if int(min_limit)<=200000 and int(max_limit)>=200000:
                print(f"卖家: {seller}")
                print(f"价格: {price} XAF/USDT")
                print(f"可售: {available} USDT")
                print(f"限额: {min_limit} - {max_limit} XAF")
                print(f"支付方式: {', '.join(pay_methods)}")
                print("-" * 40)
                rates.append(float(price))

    else:
        print("请求失败，状态码:", response.status_code)

    rate = sum(rates)/len(rates)+3           #实时修正值+3
    print(f"XAF-USDT修正延迟后的平均汇率是{rate}")

    return rate

def get_USDT_CNY_rate():
    # Binance P2P API 接口
    url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search"

    # 请求参数（查 USDT，法币为 XAF，获取卖家报价）
    payload = {
        "asset": "USDT",
        "fiat": "CNY",
        "page": 20,
        "rows": 20,
        "tradeType": "BUY",   # 卖家卖USDT，你买入
        "payTypes": ["ALIPAY","WECHAT"]         # 可指定支付方式，例如["ALIPAY","WECHAT"]
    }

    # 请求头
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"  # 模拟浏览器防止被屏蔽
    }

    # 发起 POST 请求
    response = requests.post(url, headers=headers, json=payload)

    rates = []
    # 检查响应状态
    if response.status_code == 200:
        data = response.json()
        
        # 提取报价信息
        for item in data["data"]:
            price = item["adv"]["price"]
            buyer = item["advertiser"]["nickName"]
            available = item["adv"]["surplusAmount"]
            min_limit = item["adv"]["minSingleTransAmount"]
            max_limit = item["adv"]["maxSingleTransAmount"]
            pay_methods = [p["payType"] for p in item["adv"]["tradeMethods"]]

            if int(min_limit)<=2000 and int(max_limit)>=2000 :
                print(f"买家: {buyer}")
                print(f"价格: {price} CNY/USDT")
                print(f"可收: {available} USDT")
                print(f"限额: {min_limit} - {max_limit} CNY")
                print(f"支付方式: {', '.join(pay_methods)}")
                print("-" * 40)
                rates.append(float(price))

    else:
        print("请求失败，状态码:", response.status_code)

    rate = sum(rates)/len(rates)-0.04          #实时修正值-0.04
    print(f"USDT-CNY修正延迟后的平均汇率是{rate}")

    return rate 

#换汇服务计算器（加入我的服务费）
def my_exchange_service_calculation(amount: float, my_exchange_rate: float , type="XAF",):
    #指定XAF金额，算最终得到的CNY金额
    if type == "XAF":
        charges = amount*0.05 if amount*0.05>1000 else 1000
        exchange_amount = amount-charges
        cny_obtain = exchange_amount/my_exchange_rate
        return int(cny_obtain)
    #指定最终得到的CNY金额，计算需要支付的XAF金额
    elif type == "CNY":
        exchange_amount = amount*my_exchange_rate
        charges = exchange_amount/0.95*0.05 if exchange_amount/0.95*0.05>1000 else 1000
        xaf_required = exchange_amount+charges
        return (int(xaf_required)//100+1)*100
    else:
        return "illeagal calcultion type"
    
#获取Binance汇率均值
xaf_usdt_rate = get_XAF_USDT_rate()
usdt_cny_rate = get_USDT_CNY_rate()
print(xaf_usdt_rate)
print(usdt_cny_rate)
#计算我的汇率成本
my_exchange_rate = xaf_usdt_rate/usdt_cny_rate/(1-0.015)
print(my_exchange_rate)

print("输入须指定参考金额的币种：\"XAF\"或者\"CNY\"")
type = input()
print("输入指定参考金额")
amount = int(input())
result = my_exchange_service_calculation(amount, my_exchange_rate, type)
print(result)


