class ArticleTags {
    constructor() {

        const themes = ['Animals', 'Nature', 'Sports', 'Redwood'];

        const types = ['Car Charms', 'Angels', 'Single Strand Suncatcher', 'Double Strand Suncatcher',
                    'Triple Strand Suncatcher', 'Multiple Strand Suncatcher', 'Earrings'];

        this.checkboxs = [];

        this.html = $('<div class="row"></div>').append(
            $('<div class="col"></div>').append(
                ...(themes.map(e => this.checkbox(e)))
            ),
            $('<div class="col"></div>').append(
                ...(types.map(e => this.checkbox(e)))
            )
        )
    }

    checkbox(name) {
        const check = $(`<input class="form-check-input" type="checkbox" value="${name}" id="${name}_tag">`);
        const label = $(`<label class="form-check-label" for='${name}_tag'>${name}</label>`);

        this.checkboxs.push(check);

        return $('<div class="form-check"></div>').append(
            check,
            label
        )

    }

    getChecked() {
        const result = [];

        for (let check of this.checkboxs) {
            if (check.prop('checked')) {
                result.push(check.val());
            }
        }

        return result.join(' ');
    }

    clear() {
        for (let check of this.checkboxs) {
            check.prop('checked', false);
        }
    }

    load(tags) {
        for (let check of this.checkboxs) {
            if (tags.indexOf(check.val()) > -1) {
                check.prop("checked", true);
            }
        }
    }
}


export {ArticleTags}