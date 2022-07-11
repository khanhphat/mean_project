const Admin = require('./C_Admin')

class Html extends Admin {
    html_input(_type, _name, _value, _id, _class, _placeholder, _required, _changeTitleToSlug) {
        var required = (_required==true) ? '<span class="required">(*)</span>' : '';

        return `<div class="item form-group">
            
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="`+_id+`">
                `+ this.change_name(_id) +` `+ required +`
            </label>

            <div class="col-md-6 col-sm-6 ">
                `+ this.input(_type, _name, _value, _id, _class, _placeholder, _required, _changeTitleToSlug) +`
            </div>

        </div>`;
    }

    html_select(_array, _name, _id, _class, _required, _dequy) {
        var required = (_required==true) ? '<span class="required">(*)</span>' : '';

        return `<div class="item form-group">
            
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="`+_id+`">
                `+ this.change_name(_id) +` `+ required +`
            </label>

            <div class="col-md-6 col-sm-6 ">
                `+ this.select(_array, _name, _id, _class, _required, _dequy) +`
            </div>

        </div>`;
    }
}

module.exports = Html;