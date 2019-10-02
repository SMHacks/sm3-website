// Disable scrollbar on modal
let allModals = $('.modal');
let modal = $('#modal-gallery-img');

let lastSavedScroll;
allModals.on('show.bs.modal', function () {
    lastSavedScroll = $(window).scrollTop();
    $('body').css('top', -(lastSavedScroll) + 'px');
});
allModals.on('hidden.bs.modal', function () {
    $(window).scrollTop(lastSavedScroll);
});

// Gallery prev/next buttons
let all_galleryImgs = Array.prototype.slice.call(
    document.getElementById('gallery-div')
        .getElementsByClassName('gallery-img'), 0);
let cur_galleryImgIndex;

$('.gallery-modal-toggle').click(function () {
    let clickedImg = $(this).children().first();
    cur_galleryImgIndex = all_galleryImgs.findIndex(img => clickedImg.is(img));
    updateGalleryModal(clickedImg);
});

$('#modal-gallery-prev').click(function () {
    // Add length to ensure positive
    console.log('prev click');
    cur_galleryImgIndex = (cur_galleryImgIndex + all_galleryImgs.length - 1) % all_galleryImgs.length;
    updateGalleryModal(all_galleryImgs[cur_galleryImgIndex]);
});

$('#modal-gallery-next').click(function () {
    cur_galleryImgIndex = (cur_galleryImgIndex + 1) % all_galleryImgs.length;
    updateGalleryModal(all_galleryImgs[cur_galleryImgIndex]);
});

function updateGalleryModal(img) {
    let imgSrc = $(img).attr('src');
    let newSrc = imgSrc.replace('-sm.jpg', '-lg.jpg');
    modal.find('#modal-gallery-img-lg').attr('src', newSrc);
}

