// Disable scrollbar on modal
let modal = $('#modal-gallery-img');

let lastSavedScroll;
modal.on('show.bs.modal', function () {
    lastSavedScroll = $(window).scrollTop();
    $('body').css('top', -(lastSavedScroll) + 'px');
});
modal.on('hidden.bs.modal', function () {
    $(window).scrollTop(lastSavedScroll);
});

// modal.on('show.bs.modal', function(event) {
//     let imgDiv = $(event.relatedTarget);
//     console.log(imgDiv);
//     let imgSrc = imgDiv.children().first().attr('src');
//     let newSrc = imgSrc.replace('-sm.jpg', '-lg.jpg');
//     let thisModal = $(this);
//     thisModal.find('.modal-body img').attr('src', newSrc);
// });

$('.gallery-modal-toggle').on('click', function () {
    let imgSrc = $(this).children().first().attr('src');
    let newSrc = imgSrc.replace('-sm.jpg', '-lg.jpg');
    modal.find('.modal-body img').attr('src', newSrc);
});
