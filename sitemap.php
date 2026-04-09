<?php
header('Content-Type: application/xml; charset=utf-8');

$scheme = 'https';
if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
    $scheme = $_SERVER['HTTP_X_FORWARDED_PROTO'];
} elseif (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
    $scheme = 'https';
} elseif (!empty($_SERVER['REQUEST_SCHEME'])) {
    $scheme = $_SERVER['REQUEST_SCHEME'];
}

$hostName = !empty($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'chicasencaramelo.org';
$host = $scheme . '://' . $hostName;

$files = [
    [
        'url' => '/',
        'file' => '/index.html',
        'changefreq' => 'weekly',
        'priority' => '1.0'
    ],
    [
        'url' => '/hojeable.html',
        'file' => '/hojeable.html',
        'changefreq' => 'monthly',
        'priority' => '0.8'
    ]
];

$now = date('Y-m-d');

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
echo "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

foreach ($files as $entry) {
    $path = __DIR__ . $entry['file'];
    $lastmod = $now;

    if (file_exists($path)) {
        $lastmod = date('Y-m-d', filemtime($path));
    }

    echo "  <url>\n";
    echo "    <loc>" . htmlspecialchars($host . $entry['url'], ENT_QUOTES, 'UTF-8') . "</loc>\n";
    echo "    <lastmod>$lastmod</lastmod>\n";
    echo "    <changefreq>{$entry['changefreq']}</changefreq>\n";
    echo "    <priority>{$entry['priority']}</priority>\n";
    echo "  </url>\n";
}

echo "</urlset>";
?>
