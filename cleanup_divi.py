#!/usr/bin/env python3
"""Strip Divi page builder shortcodes from WordPress-exported markdown files."""

import re
import sys
import os

def strip_divi(content):
    """Remove Divi shortcodes and clean up the resulting markdown."""
    # Split front matter from body
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            front_matter = f'---{parts[1]}---\n'
            body = parts[2]
        else:
            front_matter = ''
            body = content
    else:
        front_matter = ''
        body = content

    # The exported files contain Divi shortcodes with backslash-escaped brackets/underscores:
    #   \[et\_pb\_section fb\_built="1" ...\]
    #   \[/et\_pb\_section\]
    #   \[dsm\_flipbox ...\]
    # The \ before [ ] and _ are literal characters in the file.

    # Remove @ET-DC@ dynamic content tokens
    body = re.sub(r'@ET-DC@[^@]*@', '', body)

    # Remove Divi/DSM shortcodes (escaped form: \[...\])
    # In the file: \[ and \] are literal backslash+bracket
    # In Python regex: \\\\ matches one literal backslash
    body = re.sub(r'\\\\?\[/?(?:et\\\\?_pb\\\\?_|dsm\\\\?_).*?\\\\?\]', '', body)

    # Remove lines that are only whitespace after shortcode removal
    lines = body.split('\n')
    cleaned_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped:
            cleaned_lines.append(line)
        else:
            cleaned_lines.append('')

    # Collapse 3+ consecutive blank lines to 2
    result = '\n'.join(cleaned_lines)
    result = re.sub(r'\n{3,}', '\n\n', result)

    return front_matter + result.strip() + '\n'


def process_file(input_path, output_path, new_front_matter=None):
    """Process a single file: strip shortcodes, optionally replace front matter."""
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    cleaned = strip_divi(content)

    if new_front_matter:
        # Replace existing front matter
        if cleaned.startswith('---'):
            parts = cleaned.split('---', 2)
            if len(parts) >= 3:
                body = parts[2].strip()
                cleaned = new_front_matter + '\n' + body + '\n'
        else:
            cleaned = new_front_matter + '\n' + cleaned

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(cleaned)
    print(f"  {os.path.basename(output_path)}")


def main():
    base = '/Users/kevinstoll/Documents/deerfieldgreen.com-www'
    wp = f'{base}/wp-export'

    # --- Pages ---
    print("Processing pages...")
    pages = [
        ('pages/the-team/index.md', '_pages/team.md', 'The Team', '/team/'),
        ('pages/consulting-2/index.md', '_pages/consulting.md', 'Consulting', '/consulting/'),
        ('pages/investment/index.md', '_pages/investment.md', 'Investment', '/investment/'),
        ('pages/philanthropy/index.md', '_pages/philanthropy.md', 'Philanthropy', '/philanthropy/'),
        ('pages/life-dfg/index.md', '_pages/life.md', 'Life @DFG', '/life/'),
        ('pages/contact/index.md', '_pages/contact.md', 'Contact', '/contact/'),
        ('pages/incubator/index.md', '_pages/incubator.md', 'Incubator', '/incubator/'),
        ('pages/private-equity/index.md', '_pages/private-equity.md', 'Private Equity', '/private-equity/'),
    ]

    for src, dst, title, permalink in pages:
        fm = f'---\nlayout: page\ntitle: "{title}"\npermalink: {permalink}\n---\n'
        process_file(f'{wp}/{src}', f'{base}/{dst}', fm)

    # Homepage
    fm = '---\nlayout: home\ntitle: "Deerfield Green"\n---\n'
    process_file(f'{wp}/pages/home-923/index.md', f'{base}/index.md', fm)

    # --- Posts ---
    print("Processing posts...")
    posts = [
        ('posts/monetizing-usage-model-must-1-pilot-first/index.md',
         '_posts/2024-10-18-pilot-first.md',
         'Monetizing Usage Model Must #1: Pilot First', '2024-10-18'),
        ('posts/monetizing-usage-model-must-2-get-seriously-customer-centric/index.md',
         '_posts/2024-10-18-get-customer-centric.md',
         'Monetizing Usage Model Must #2: Get Seriously Customer-Centric', '2024-10-18'),
        ('posts/monetizing-usage-model-must-3-plan-for-scale/index.md',
         '_posts/2024-10-18-plan-for-scale.md',
         'Monetizing Usage Model Must #3: Plan for Scale', '2024-10-18'),
        ('posts/the-architectural-evolution-of-japans-innovation-ecosystem-a-critical-analysis-of-incubator-models-in-the-context-of-demographic-transformation-and-technological-convergence/index.md',
         '_posts/2025-08-26-japan-innovation-ecosystem.md',
         'The Architectural Evolution of Japan\'s Innovation Ecosystem', '2025-08-26'),
        ('posts/software-as-a-service-and-the-japanese-enterprise-cultural-adaptation-market-dynamics-and-the-transformation-of-business-software-consumption-in-contemporary-japan/index.md',
         '_posts/2025-08-27-saas-japanese-enterprise.md',
         'Software-as-a-Service and the Japanese Enterprise', '2025-08-27'),
        ('posts/the-demographic-imperative-healthcare-system-transformation-in-japans-super-aged-society-economic-social-and-technological-dimensions-of-care-delivery-evolution/index.md',
         '_posts/2025-08-27-demographic-imperative-japan.md',
         'The Demographic Imperative: Healthcare System Transformation in Japan\'s Super-Aged Society', '2025-08-27'),
        ('posts/artificial-intelligence-and-the-transformation-of-japanese-healthcare-technological-convergence-cultural-adaptation-and-the-architecture-of-intelligent-care-systems/index.md',
         '_posts/2025-08-27-ai-japanese-healthcare.md',
         'Artificial Intelligence and the Transformation of Japanese Healthcare', '2025-08-27'),
        ('posts/patient-access-and-experience-in-japans-healthcare-system-navigating-universal-coverage-amid-growing-disparities/index.md',
         '_posts/2025-08-27-patient-access-japan.md',
         'Patient Access and Experience in Japan\'s Healthcare System', '2025-08-27'),
        ('posts/transforming-japans-healthcare-future-government-programs-digital-innovation-and-sustainable-solutions/index.md',
         '_posts/2025-08-27-japan-healthcare-future.md',
         'Transforming Japan\'s Healthcare Future', '2025-08-27'),
        ('posts/the-healthcare-provider-crisis-in-japan-navigating-workforce-shortages-infrastructure-inefficiencies-and-system-strain/index.md',
         '_posts/2025-08-27-healthcare-provider-crisis-japan.md',
         'The Healthcare Provider Crisis in Japan', '2025-08-27'),
    ]

    for src, dst, title, date in posts:
        fm = f'---\nlayout: post\ntitle: "{title}"\ndate: {date}\nauthor: "Kevin Stoll"\n---\n'
        process_file(f'{wp}/{src}', f'{base}/{dst}', fm)

    # --- Japanese Pages ---
    print("Processing Japanese pages...")
    ja_pages = [
        ('pages/チーム/index.md', 'ja/_pages/team.md', 'チーム', '/ja/team/'),
        ('pages/コンサルティング/index.md', 'ja/_pages/consulting.md', 'コンサルティング', '/ja/consulting/'),
        ('pages/投資/index.md', 'ja/_pages/investment.md', '投資', '/ja/investment/'),
        ('pages/慈善活動/index.md', 'ja/_pages/philanthropy.md', '慈善活動', '/ja/philanthropy/'),
        ('pages/dfgでの生活/index.md', 'ja/_pages/life.md', 'DFGでの生活', '/ja/life/'),
        ('pages/連絡先/index.md', 'ja/_pages/contact.md', '連絡先', '/ja/contact/'),
        ('pages/インキュベーター/index.md', 'ja/_pages/incubator.md', 'インキュベーター', '/ja/incubator/'),
        ('pages/プライベート・エクイティ/index.md', 'ja/_pages/private-equity.md', 'プライベート・エクイティ', '/ja/private-equity/'),
    ]

    for src, dst, title, permalink in ja_pages:
        fm = f'---\nlayout: page\ntitle: "{title}"\npermalink: {permalink}\nlang: ja\n---\n'
        process_file(f'{wp}/{src}', f'{base}/{dst}', fm)

    # Japanese homepage
    fm = '---\nlayout: home\ntitle: "ディアフィールド・グリーン"\npermalink: /ja/\nlang: ja\n---\n'
    process_file(f'{wp}/pages/ディアフィールド・グリーン/index.md', f'{base}/ja/index.md', fm)

    # --- Japanese Posts ---
    print("Processing Japanese posts...")
    ja_posts = [
        ('posts/利用モデルの収益化に必要なことその1：まず試験/index.md',
         'ja/_posts/2024-10-18-pilot-first.md',
         '利用モデルの収益化に必要なことその1：まず試験的に利用する', '2024-10-18'),
        ('posts/利用モデルの収益化に必要なことその2：顧客中-2/index.md',
         'ja/_posts/2024-10-18-get-customer-centric.md',
         '利用モデルの収益化に必要なことその2：顧客中心主義を徹底する', '2024-10-18'),
        ('posts/利用モデルの収益化に必要なこと-その3：規模の拡/index.md',
         'ja/_posts/2024-10-18-plan-for-scale.md',
         '利用モデルの収益化に必要なこと その3：規模の拡大計画', '2024-10-18'),
        ('posts/日本のイノベーション・エコシステムの構造的進/index.md',
         'ja/_posts/2025-08-26-japan-innovation-ecosystem.md',
         '日本のイノベーション・エコシステムの構造的進化', '2025-08-26'),
        ('posts/saasと日本企業：文化的適応、市場ダイナミクス、/index.md',
         'ja/_posts/2025-08-27-saas-japanese-enterprise.md',
         'SaaSと日本企業：文化的適応、市場ダイナミクス、現代日本におけるビジネス・ソフトウェア消費の変容', '2025-08-27'),
        ('posts/人口動態の急務：日本の超高齢社会における医療/index.md',
         'ja/_posts/2025-08-27-demographic-imperative-japan.md',
         '人口動態の急務：日本の超高齢社会における医療システムの変革', '2025-08-27'),
        ('posts/人工知能と日本の医療の変容：技術的融合、文化/index.md',
         'ja/_posts/2025-08-27-ai-japanese-healthcare.md',
         '人工知能と日本の医療の変容：技術的融合、文化的適応、インテリジェント・ケア・システムのアーキテクチャ', '2025-08-27'),
        ('posts/日本の医療制度における患者アクセスと経験：格/index.md',
         'ja/_posts/2025-08-27-patient-access-japan.md',
         '日本の医療制度における患者アクセスと経験', '2025-08-27'),
        ('posts/日本の医療の未来を変える：政府プログラム、デ/index.md',
         'ja/_posts/2025-08-27-japan-healthcare-future.md',
         '日本の医療の未来を変える：政府プログラム、デジタル革新、持続可能なソリューション', '2025-08-27'),
        ('posts/日本における医療提供者の危機：労働力不足、イ/index.md',
         'ja/_posts/2025-08-27-healthcare-provider-crisis-japan.md',
         '日本における医療提供者の危機：労働力不足、インフラの非効率性、システムのひずみを乗り越える', '2025-08-27'),
    ]

    for src, dst, title, date in ja_posts:
        fm = f'---\nlayout: post\ntitle: "{title}"\ndate: {date}\nauthor: "Kevin Stoll"\nlang: ja\npermalink: /ja/{os.path.basename(dst).split("-", 3)[-1].replace(".md", "")}/\n---\n'
        process_file(f'{wp}/{src}', f'{base}/{dst}', fm)

    print("Done!")


if __name__ == '__main__':
    main()
