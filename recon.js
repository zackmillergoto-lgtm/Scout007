const axios = require('axios');

async function runRecon() {
    try {
        // --- 【关键修正】使用你验证过的、唯一正确的URL ---
        const url = 'https://raw.githubusercontent.com/tourniquet/awesome-phaser/master/README.md';
        console.log(`🚀 开始侦察最终目标 (原始README): ${url}`);

        const { data: markdownContent } = await axios.get(url);
        console.log("✅ 目标README.md已获取，开始解析...");

        // --- 【最终修正】我们寻找最可能包含完整项目示例的章节 ---
        const sectionsToScrape = ['Tutorials', 'Video tutorials'];
        const results = {};

        sectionsToScrape.forEach(sectionTitle => {
            results[sectionTitle] = [];
            // 正则表达式，用于匹配指定标题下的Markdown列表项
            const sectionRegex = new RegExp(`### ${sectionTitle}[\\s\\S]*?(?=\\n###|$)`);
            const sectionMatch = markdownContent.match(sectionRegex);

            if (sectionMatch) {
                // --- 【最终修正】使用你（Jules）指出的、正确的正则表达式逻辑 ---
                const itemRegex = /\[(.*?)\]\((.*?)\)/g; // 只捕获链接的文本和URL
                let itemMatch;
                while ((itemMatch = itemRegex.exec(sectionMatch[0])) !== null) {
                    const name = itemMatch[1]; // 正确访问捕获组 1
                    const url = itemMatch[2];  // 正确访问捕获组 2

                    results[sectionTitle].push({ name, url });
                }
            }
        });

        console.log("\n\n--- 📜 最终侦察报告 ---");
        for (const section in results) {
            console.log(`\n--- ${section} (共找到 ${results[section].length} 个项目) ---`);
            results[section].forEach((item, index) => {
                console.log(`\n${index + 1}. [${item.name}]`);
                console.log(`   URL: ${item.url}`);
            });
        }

    } catch (error) {
        console.error("❌ 侦察任务失败:", error.message);
    }
}

runRecon();
