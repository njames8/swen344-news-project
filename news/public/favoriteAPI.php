<?php
function storeStuff($title, $description, $url, $image, $pubDate, $isFavorite)
{
    $info = array(
        'title' => $title,
        'description' => $description,
        'url' => $url,
        'image' => $image,
        'pubDate' => $pubDate,
        'isFavorite' => $isFavorite
    );
    $fName = "favorites.json";
    $prevContents = file_get_contents($fName);
    $jsonContents = json_decode($prevContents);
                if (is_null($jsonContents) || empty($jsonContents)) {
                        $jsonContents = array();
                }
    array_push($jsonContents, $info);
    $newJson = json_encode($jsonContents);
    file_put_contents($fName, $newJson);
    return $newJson;
}

function removeStuff($title, $description, $url, $image, $pubDate)
{
    $fName = "favorites.json";
    $prevContents = file_get_contents($fName);
    $jsonContents = json_decode($prevContents, true);
    foreach($jsonContents as $key => $value) {
       if($value['title'] == $title && $value['description'] == $description && $value['url'] == $url && $value['pubDate'] == $pubDate) {
        unset($jsonContents[$key]);
       }
    }
    $newJson = json_encode($jsonContents);
    file_put_contents($fName, $newJson);
    return $newJson;
}
$value = "An Error Has Occurred";
if (isset($_POST["action"]) && $_POST["action"]=="storeStuff")
{
        if (isset($_POST["title"]) && isset($_POST["description"]) && isset($_POST["url"]) && isset($_POST["image"]) && isset($_POST["pubDate"]) && isset($_POST["isFavorite"])) {
                $value = storeStuff($_POST["title"], $_POST["description"], $_POST["url"], $_POST["image"], $_POST["pubDate"], $_POST["isFavorite"]);
        }
}
else if (isset($_POST["action"]) && $_POST["action"]=="removeStuff")
{
        if (isset($_POST["title"]) && isset($_POST["description"]) && isset($_POST["url"]) && isset($_POST["image"]) && isset($_POST["pubDate"])) {
                $value = removeStuff($_POST["title"], $_POST["description"], $_POST["url"], $_POST["image"], $_POST["pubDate"]);
        }
}
exit($value);
?>
