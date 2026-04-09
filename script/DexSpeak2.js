// 获取原始响应体
let body = $response.body;

console.log('=== 原始响应 ===');
console.log(body);

let json = JSON.parse(body);

console.log('=== 修改前关键字段 ===');

// ====================== 修改逻辑 ======================

// 处理第一个 JSON 类型（包含 subscription 对象）
if (json.subscription && typeof json.subscription === "object") {
    if (json.subscription.tier === "free") {
        json.subscription.tier = "lifetime";
        console.log('✓ tier 已修改: free → lifetime');
    }
    json.subscription.current_period_end = "2099-12-31T23:59:59.999Z";
    json.subscription.can_activate_trial = false;
    console.log('✓ current_period_end 已改为 2099-12-31');
}

// 处理第二个 JSON 类型（你最新提供的这个）
if (json.subscription_level !== undefined) {
    if (json.subscription_level === "free") {
        json.subscription_level = "lifetime";
        console.log('✓ subscription_level 已修改: free → lifetime');
    }
    
    // 只修改 expires_at，不修改 quota_reset_at
    json.subscription_expires_at = "2099-12-31T23:59:59.999Z";
    console.log('✓ subscription_expires_at 已改为 2099-12-31');
    
    // 用量限制大幅提升
    json.quota_total_mapped = 999999;      // 极大配额
    json.quota_percentage = 100;           // 100% 可用
    // quota_used_mapped 和 quota_reset_at 保持原始值不变
    console.log('✓ 用量限制已大幅提升 (quota_total_mapped = 999999, quota_percentage = 100)');
}

// ====================== 调试输出 ======================

console.log('=== 修改后完整 JSON ===');
console.log(JSON.stringify(json, null, 2));

// 返回修改后的响应体
body = JSON.stringify(json);
$done({ body });