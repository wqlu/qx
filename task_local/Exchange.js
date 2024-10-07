/**
 * @fileoverview HTTP request to CIB personal bank for USD quotation query with dynamic timestamp
 */

const timestamp = Date.now();

const baseUrl = "https://personalbank.cib.com.cn/pers/main/pubinfo/ifxQuotationQuery/list";
const queryParams = `_search=false&dataSet.nd=${timestamp}&dataSet.rows=80&dataSet.page=1&dataSet.sidx=&dataSet.sord=asc`;
const url = `${baseUrl}?${queryParams}`;

const method = "GET";
const headers = {
    "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
    "Accept": "*/*",
    "Host": "personalbank.cib.com.cn",
    "Connection": "keep-alive",
    "Cookie": "JSESSIONID=ERRmNmWQDgB8bUO-l4aLvR4hV8zKEUiYb5PZNxEuKdv5hdYFCpBT!-598607429; BIGipServerpersonal_7028_pool=!50UBijwkBGK0IoErv31zpUSRFOgkFBcZnV8wah/CAa3m1Be9YYfA7zvbWCK3L2COi7t1FWiRrdVl68U="
};

const myRequest = {
    url: url,
    method: method,
    headers: headers,
};

$task.fetch(myRequest).then(response => {
    const data = JSON.parse(response.body);
    const usdData = data.rows.find(row => row.cell[0] === "美元");

    if (usdData) {
        const [currency, code, amount, buyRate, sellRate, cashBuyRate, cashSellRate] = usdData.cell;
        const usdInfo = `
币种: ${currency}
代码: ${code}
金额: ${amount}
现汇买入价: ${buyRate}
现汇卖出价: ${sellRate}
现钞买入价: ${cashBuyRate}
现钞卖出价: ${cashSellRate}
        `.trim();

        console.log(usdInfo);
        $notify("USD Exchange Rate", "Success", usdInfo);
    } else {
        console.log("USD data not found");
        $notify("USD Exchange Rate", "Error", "USD data not found");
    }

    $done();
}, reason => {
    console.log('error', reason.error);
    $notify("USD Exchange Rate", "Error", reason.error);
    $done();
});