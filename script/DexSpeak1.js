// 获取原始响应体
let body = $response.body;

// 解析 JSON
let json = JSON.parse(body);

// 修改 subscription 中的 tier: free → lifetime
if (json.subscription && json.subscription.tier === "free") {
    json.subscription.tier = "lifetime";
}

// 将修改后的 JSON 转回字符串
body = JSON.stringify(json);

// 返回修改后的响应体
$done({ body });