// Rule-based chatbot engine for product analysis without external APIs
class ChatbotEngine {
  constructor() {
    this.rules = this.initializeRules();
  }

  initializeRules() {
    return {
      titleAnalysis: {
        minLength: 10,
        maxLength: 140,
        keywordIndicators: ['size', 'color', 'material', 'brand', 'type', 'pack'],
      },
      descriptionAnalysis: {
        minLength: 20,
        optimalLength: 200,
        importantElements: ['specs', 'features', 'benefits', 'dimensions', 'material', 'care'],
      },
      seoKeywords: [
        'premium', 'authentic', 'durable', 'eco-friendly', 'handmade', 'vintage',
        'professional', 'waterproof', 'lightweight', 'organic', 'sustainable'
      ],
    };
  }

  analyzeTitleIssues(title) {
    const issues = [];
    if (!title) return ['Title is missing'];
    
    if (title.length < 10) issues.push('Title too short (minimum 10 characters)');
    if (title.length > 140) issues.push('Title too long (maximum 140 characters)');
    
    const hasKeywords = this.rules.titleAnalysis.keywordIndicators.some(keyword =>
      title.toLowerCase().includes(keyword)
    );
    if (!hasKeywords && title.split(' ').length < 3) {
      issues.push('Title lacks descriptive keywords (e.g., size, color, material)');
    }
    
    if (!/[a-zA-Z0-9]/.test(title)) issues.push('Title contains no readable content');
    
    return issues;
  }

  analyzeDescriptionIssues(description) {
    const issues = [];
    if (!description) {
      issues.push('Missing product description - critical for SEO and discoverability');
      return issues;
    }

    if (description.length < 20) {
      issues.push('Description too short (minimum 20 characters recommended)');
    }
    
    if (description.length < 100) {
      issues.push('Description lacks detail - expand with specs, materials, use cases');
    }

    const descLower = description.toLowerCase();
    const missingElements = [];
    
    if (!descLower.match(/\b(size|dimension|length|width|height|diameter|mm|cm|inch)\b/i)) {
      missingElements.push('dimensions or size');
    }
    if (!descLower.match(/\b(material|fabric|plastic|metal|wood|leather|cotton)\b/i)) {
      missingElements.push('material information');
    }
    if (!descLower.match(/\b(feature|benefit|use|purpose|ideal for|perfect for)\b/i)) {
      missingElements.push('key features or benefits');
    }

    if (missingElements.length > 0) {
      issues.push(`Missing important details: ${missingElements.join(', ')}`);
    }

    return issues;
  }

  generateProductAnalysis(product, detectedIssues) {
    const titleIssues = this.analyzeTitleIssues(product.title);
    const descriptionIssues = this.analyzeDescriptionIssues(product.description);
    const allIssues = [...new Set([...detectedIssues, ...titleIssues, ...descriptionIssues])];

    const analysisLines = [
      `Product Title: "${product.title}"`,
      '',
      this.generateAIPerception(product, allIssues),
      '',
      this.generateWeaknessesSection(allIssues),
      '',
      this.generateRecommendationsSection(product, allIssues),
    ];

    return analysisLines.join('\n');
  }

  generateAIPerception(product, issues) {
    let perception = '**AI Shopping Assistant Perspective:**\n';

    if (issues.length === 0) {
      perception += 'This product listing is well-optimized and should perform well with AI shopping assistants. The metadata is clear, descriptive, and contains the essential information needed for accurate product recommendations.';
    } else if (issues.length <= 2) {
      perception += 'This product listing is mostly clear to AI systems, but has some minor gaps. With a few quick improvements, discoverability through AI shopping assistants would significantly improve.';
    } else {
      perception += 'This product listing would benefit from improvements to be optimally understood by AI shopping assistants. Several metadata elements are incomplete or unclear, potentially limiting product visibility.';
    }

    return perception;
  }

  generateWeaknessesSection(issues) {
    if (issues.length === 0) {
      return '**Main Weaknesses:** No significant weaknesses detected. The product metadata is comprehensive and well-structured.';
    }

    const prioritized = this.prioritizeIssues(issues);
    const weaknesses = prioritized
      .slice(0, 3)
      .map((issue, idx) => `${idx + 1}. ${issue}`)
      .join('\n');

    return `**Main Weaknesses:**\n${weaknesses}`;
  }

  prioritizeIssues(issues) {
    const priority = {
      'Title is missing': 10,
      'Missing product description': 9,
      'Title too short': 8,
      'Title too long': 7,
      'Description too short': 6,
      'lacks detail': 5,
      'Missing important details': 4,
      'lacks': 3,
    };

    return issues.sort((a, b) => {
      const scoreA = Object.entries(priority).reduce((score, [key, val]) =>
        a.includes(key) ? val : score, 1
      );
      const scoreB = Object.entries(priority).reduce((score, [key, val]) =>
        b.includes(key) ? val : score, 1
      );
      return scoreB - scoreA;
    });
  }

  generateRecommendationsSection(product, issues) {
    const recommendations = [];

    if (this.analyzeTitleIssues(product.title).length > 0) {
      recommendations.push(
        'Enhance Title: Include product type, key attribute (color/size), and main benefit'
      );
    }

    if (this.analyzeDescriptionIssues(product.description).length > 0) {
      recommendations.push(
        'Expand Description: Add dimensions, materials, care instructions, and use cases'
      );
    }

    recommendations.push(
      'Add Keywords: Include terms like size, material, color, purpose to improve searchability'
    );
    recommendations.push(
      'Structure Data: Organize specs in bullet points for easier AI parsing'
    );
    recommendations.push(
      'Include Context: Mention compatible products, style categories, or seasonal relevance'
    );

    const recText = recommendations
      .slice(0, 3)
      .map((rec, idx) => `${idx + 1}. ${rec}`)
      .join('\n');

    return `**Optimization Recommendations:**\n${recText}`;
  }

  generateSemanticTags(product) {
    const tags = [];
    const title = product.title.toLowerCase();
    const description = (product.description || '').toLowerCase();
    const combined = `${title} ${description}`;

    const tagPatterns = {
      'eco-friendly': /\b(eco|organic|sustainable|green|natural|biodegradable)\b/i,
      'premium': /\b(premium|luxury|high-end|deluxe|exclusive)\b/i,
      'handmade': /\b(handmade|handcrafted|artisan|crafted)\b/i,
      'vintage': /\b(vintage|retro|antique|classic)\b/i,
      'waterproof': /\b(waterproof|water-resistant|moisture-proof)\b/i,
      'lightweight': /\b(lightweight|light-weight|portable)\b/i,
      'durable': /\b(durable|long-lasting|sturdy|strong)\b/i,
    };

    Object.entries(tagPatterns).forEach(([tag, pattern]) => {
      if (pattern.test(combined)) tags.push(tag);
    });

    return tags.length > 0 ? tags : ['general', 'product'];
  }

  generateDiscoverabilityGuidance(product, issues) {
    const guidance = [];
    const descLength = (product.description || '').length;

    guidance.push('**Discoverability Guidance:**');
    guidance.push('');

    if (issues.length === 0) {
      guidance.push('✓ Your product listing is well-positioned for AI discovery');
    } else {
      guidance.push(`⚠ Address ${issues.length} metadata gap(s) to improve AI discoverability`);
    }

    guidance.push('');
    guidance.push('• Use specific, searchable keywords in title and description');
    guidance.push('• Include measurements, materials, and compatibility details');

    if (descLength < 150) {
      guidance.push('• Expand description (currently ' + descLength + ' chars, aim for 200+)');
    }

    guidance.push('• Structure specs in bullet format or short paragraphs');
    guidance.push('• Add related product categories or use cases');
    guidance.push('• Include care instructions or warranty info if applicable');

    return guidance.join('\n');
  }
}

module.exports = ChatbotEngine;
