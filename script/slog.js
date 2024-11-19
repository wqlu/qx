// 获取原始响应体
let body = $response.body;

// 解析 JSON
let json = JSON.parse(body);

// 修改 user_roles 数组中的 general 为 lifetime
if (json.user_roles && Array.isArray(json.user_roles)) {
    json.user_roles = json.user_roles.map(role => role === "general" ? "lifetime" : role);
}

// 将修改后的 JSON 转回字符串
body = JSON.stringify(json);

// 返回修改后的响应体
$done({ body });

