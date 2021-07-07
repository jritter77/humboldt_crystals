function Modal(title, body, onSubmit) {

    const submit = (onSubmit) ? `<button type="button" class="btn btn-primary" id="modalSubmit">Save changes</button>` : '';

    $('#app').prepend(`
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ${body}
                </div>
                <div class="modal-footer">
                    ${submit}
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    `);



    // change to where submit button only appears if onSubmit is not null
    $("#modalSubmit").click(onSubmit);
}

export {Modal}