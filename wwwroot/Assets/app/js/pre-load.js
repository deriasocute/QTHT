function imgErrorOrDefault(image, url) {
    if (image.src == url)
        return false;
    image.onerror = "";
    image.src = url;
}

function imgError(image, isAvatar) {
    image.onerror = "";
    image.src = "/Assets/app/img/error-image.png";
    if (isAvatar == true) {
        image.src = "/Assets/app/img/error-avatar.png";
    }
    return true;
}

 