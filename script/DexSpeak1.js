// 获取原始响应体
let body = $response.body;

// 调试：打印原始响应
console.log('=== 原始响应 ===');
console.log(body);

let json = JSON.parse(body);

// 调试：打印解析后的对象关键字段
console.log('=== 解析后关键字段 ===');
console.log('subscription存在:', !!json.subscription);
if (json.subscription) {
    console.log('原始 tier:', json.subscription.tier);
    console.log('原始 can_activate_trial:', json.subscription.can_activate_trial);
}

// 修改 subscription 中的 tier: free → lifetime
if (json.subscription && typeof json.subscription === "object") {
    if (json.subscription.tier === "free") {
        json.subscription.tier = "lifetime";
        console.log('已修改 tier: free → lifetime');
    } else {
        console.log('tier 不是 free，无需修改，当前值为:', json.subscription.tier);
    }
    
    // 2. 修改 current_period_end 为 2099年
    json.subscription.current_period_end = "2099-12-31T23:59:59.999Z";
    console.log('✓ current_period_end 已修改为 2099-12-31');

    // 可选：同时关闭试用激活（推荐加上）
    json.subscription.can_activate_trial = false;
    console.log('✓ can_activate_trial 已设为 false');
    
} else {
    console.log('未找到 subscription 对象');
}

// 调试：打印修改后的完整 JSON
console.log('=== 修改后完整 JSON ===');
console.log(JSON.stringify(json, null, 2));

// 将修改后的 JSON 转回字符串
body = JSON.stringify(json);

// 返回修改后的响应体
$done({ body });