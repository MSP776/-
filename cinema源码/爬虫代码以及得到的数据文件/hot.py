import json
import re
import time

import requests
from requests import RequestException


# 爬取热映电影

def get_one_page(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        }
        response = requests.get(url, headers=headers)  # 获取网页源代码
        if response.status_code == 200:
            return response.text  # 成功响应 返回源代码
        return None  # 失败 返回空值
    except RequestException:
        return None  # 异常值处理


def parse_one_page(html):
    pattern = re.compile(
        '<dd>.*?board-index.*?>(.*?)</i>.*?data-src="(.*?)".*?name.*?a.*?>(.*?)</a>.*?star.*?>(.*?)</p>.*?releasetime.*?>(.*?)</p>.*?integer.*?>(.*?)</i>.*?fraction.*?>(.*?)</i>.*?</dd>',
        re.S)  # 写一个正则提取的方法
    items = re.findall(pattern, html)  # 找出所有符合条件的内容  此时是一个列表形式
    for item in items:  # 遍历提取结果并生成字典
        yield {  # 迭代器
            'index': item[0],
            'image': item[1],
            'title': item[2].strip(),
            'actor': item[3].strip()[3:] if len(item[3]) > 3 else '',
            'time': item[4].strip()[5:] if len(item[4]) > 5 else '',
            'score': item[5].strip() + item[6].strip()
        }


def write_to_file(content):  # 写入文件
    with open('result1.txt', 'a', encoding='utf-8') as f:
        print(type(json.dumps(content)))
        f.write(json.dumps(content, ensure_ascii=False) + '\n')


def main(offset):
    url = 'http://maoyan.com/board/7?offset=' + str(offset)  # 接收offset参数
    html = get_one_page(url)  # 赋值源代码给html
    # print(html)
    for item in parse_one_page(html):  # 遍历字典
        print(item)
        write_to_file(item)  # 写入文件


if __name__ == '__main__':
    for i in range(3):
        print("爬取第%d页。。。。。。。。" % (i + 1))
        main(offset=i * 10)  # 传入offset参数
        time.sleep(3)  # 延时等待 速度过快由于反爬虫会无响应
