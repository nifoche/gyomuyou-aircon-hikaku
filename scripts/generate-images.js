require('dotenv').config({ path: '.env.local' });
const Replicate = require('replicate');
const fs = require('fs').promises;
const path = require('path');

const { beforeAfterPrompts } = require('./prompts/before-after-prompts');
const { galleryPrompts } = require('./prompts/gallery-prompts');

// Replicateクライアント初期化
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// 企業IDリスト
const companies = [
  'genki-denki',
  'aircon-pro-repair',
  'rockfield',
  'aircon-honten',
  'shuri110',
  'fuji-setubi'
];

// Before/After画像生成
async function generateBeforeAfterImages(companyId) {
  const results = [];

  for (const promptSet of beforeAfterPrompts) {
    console.log(`Generating ${promptSet.category} for ${companyId}...`);

    try {
      // Before画像生成
      const beforeOutput = await replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
          input: {
            prompt: promptSet.beforePrompt,
            width: promptSet.width,
            height: promptSet.height,
            num_outputs: 1,
            scheduler: "K_EULER",
            num_inference_steps: 25,
            guidance_scale: 7.5
          }
        }
      );

      const beforeImageUrl = Array.isArray(beforeOutput) ? beforeOutput[0] : beforeOutput;
      const beforeFileName = `${companyId}-${promptSet.category}-before.png`;
      await downloadImage(beforeImageUrl, path.join('public/images/before-after', beforeFileName));

      // 少し待機（API制限回避）
      await sleep(12000);

      // After画像生成
      const afterOutput = await replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
          input: {
            prompt: promptSet.afterPrompt,
            width: promptSet.width,
            height: promptSet.height,
            num_outputs: 1,
            scheduler: "K_EULER",
            num_inference_steps: 25,
            guidance_scale: 7.5
          }
        }
      );

      const afterImageUrl = Array.isArray(afterOutput) ? afterOutput[0] : afterOutput;
      const afterFileName = `${companyId}-${promptSet.category}-after.png`;
      await downloadImage(afterImageUrl, path.join('public/images/before-after', afterFileName));

      results.push({
        id: `${companyId}-${promptSet.category}`,
        category: promptSet.category,
        title: promptSet.title,
        before: {
          path: `/images/before-after/${beforeFileName}`,
          caption: `Before: ${promptSet.title}`,
          alt: `${companyId} ${promptSet.category} before`
        },
        after: {
          path: `/images/before-after/${afterFileName}`,
          caption: `After: ${promptSet.title}`,
          alt: `${companyId} ${promptSet.category} after`
        },
        generatedAt: new Date().toISOString()
      });

      console.log(`✓ Generated ${promptSet.category} for ${companyId}`);

      // 待機（API制限回避: $5未満は6リクエスト/分）
      await sleep(10000);

    } catch (error) {
      console.error(`✗ Error generating ${promptSet.category} for ${companyId}:`, error.message);

      // 429エラーの場合は追加待機
      if (error.message.includes('429')) {
        console.log(`  Rate limited, waiting 15 seconds...`);
        await sleep(15000);
      }
    }
  }

  return results;
}

// ギャラリー画像生成
async function generateGalleryImages(companyId, count = 3) {
  const results = [];

  for (let i = 0; i < count; i++) {
    const promptSet = galleryPrompts[i % galleryPrompts.length];
    console.log(`Generating gallery ${i + 1}/${count} for ${companyId}...`);

    try {
      const output = await replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
          input: {
            prompt: promptSet.prompt,
            width: promptSet.width,
            height: promptSet.height,
            num_outputs: 1,
            scheduler: "K_EULER",
            num_inference_steps: 25
          }
        }
      );

      const imageUrl = Array.isArray(output) ? output[0] : output;
      const fileName = `${companyId}-${i + 1}.png`;
      await downloadImage(imageUrl, path.join('public/images/examples', fileName));

      results.push({
        id: `${companyId}-${i + 1}`,
        path: `/images/examples/${fileName}`,
        category: promptSet.category,
        caption: promptSet.caption,
        alt: `${companyId} ${promptSet.caption}`,
        generatedAt: new Date().toISOString()
      });

      console.log(`✓ Generated gallery ${i + 1} for ${companyId}`);

      // 待機（API制限回避: $5未満は6リクエスト/分）
      await sleep(10000);

    } catch (error) {
      console.error(`✗ Error generating gallery ${i + 1} for ${companyId}:`, error.message);

      // 429エラーの場合は追加待機
      if (error.message.includes('429')) {
        console.log(`  Rate limited, waiting 15 seconds...`);
        await sleep(15000);
      }
    }
  }

  return results;
}

// 画像ダウンロード
async function downloadImage(url, filepath) {
  const response = await global.fetch(url);
  const buffer = await response.arrayBuffer();
  await fs.writeFile(filepath, Buffer.from(buffer));
  console.log(`  Downloaded: ${filepath}`);
}

// スリープ関数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// メイン処理
async function main() {
  console.log('=== AI Image Generation for Aircon Comparison Site ===\n');

  // 環境変数チェック
  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('Error: REPLICATE_API_TOKEN is not set in .env.local');
    console.error('Please create .env.local and add your API token:');
    console.error('REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    process.exit(1);
  }

  // companies.json読み込み
  const companiesData = JSON.parse(await fs.readFile('data/companies.json', 'utf-8'));

  // 企業ごとに画像生成
  for (const companyId of companies) {
    console.log(`\n=== Processing ${companyId} ===`);

    const company = companiesData.companies.find(c => c.id === companyId);

    if (!company) {
      console.error(`Company ${companyId} not found in companies.json`);
      continue;
    }

    // Before/After生成
    console.log('\n--- Generating Before/After Images ---');
    const beforeAfterImages = await generateBeforeAfterImages(companyId);

    // ギャラリー生成
    console.log('\n--- Generating Gallery Images ---');
    const galleryImages = await generateGalleryImages(companyId, 3);

    // companies.json更新
    if (!company.images) {
      company.images = {};
    }

    company.images.beforeAfter = beforeAfterImages;
    company.images.gallery = galleryImages;
    company.images.store = {
      path: `/images/stores/${companyId}-shop.png`,
      caption: `${company.name}のサービス拠点`,
      alt: `${company.name}の業務用エアコン修理センター`
    };

    console.log(`\n✓ Updated companies.json for ${companyId}`);
  }

  // companies.json保存
  await fs.writeFile('data/companies.json', JSON.stringify(companiesData, null, 2));
  console.log('\n=== All done! ===');
  console.log(`Generated images saved to public/images/`);
  console.log(`Updated data/companies.json`);
}

// コマンドライン引数で特定の企業のみ生成可能
(async () => {
  const targetCompany = process.argv[2];

  if (targetCompany) {
    console.log(`Target company: ${targetCompany}`);
    // 特定の企業のみ処理
    const companiesData = JSON.parse(await fs.readFile('data/companies.json', 'utf-8'));
    const company = companiesData.companies.find(c => c.id === targetCompany);

    if (!company) {
      console.error(`Company ${targetCompany} not found`);
      process.exit(1);
    }

    console.log(`\n=== Processing ${targetCompany} ===`);

    const beforeAfterImages = await generateBeforeAfterImages(targetCompany);
    const galleryImages = await generateGalleryImages(targetCompany, 3);

    company.images = {
      beforeAfter: beforeAfterImages,
      gallery: galleryImages,
      store: {
        path: `/images/stores/${targetCompany}-shop.png`,
        caption: `${company.name}のサービス拠点`,
        alt: `${company.name}の業務用エアコン修理センター`
      }
    };

    await fs.writeFile('data/companies.json', JSON.stringify(companiesData, null, 2));
    console.log(`\n✓ Updated companies.json for ${targetCompany}`);
  } else {
    await main();
  }
})().catch(console.error);
