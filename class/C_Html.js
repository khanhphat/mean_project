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

    html_pagination(sumPage=0, pageNumber=0){
        var str='<div class="dataTables_paginate paging_simple_numbers" id="datatable-buttons_paginate">';

        str+='<ul class="pagination">';

            // First
            str+=`<li class="paginate_button previous disabled" id="datatable-buttons_previous">
                <a href="#" aria-controls="datatable-buttons" data-dt-idx="0" tabindex="0">First</a>
            </li>`;

            // Previous
            str+=`<li class="paginate_button previous disabled" id="datatable-buttons_previous">
                <a href="#" aria-controls="datatable-buttons" data-dt-idx="0" tabindex="0">Previous</a>
            </li>`;

            // Phần thân
            for (let index = 1; index <= sumPage; index++) {
                // xét active
                var active = (pageNumber==index) ? 'active' : '';

                str+=`<li class="paginate_button `+active+`">
                    <a href="/admin/`+ this.get_name_module() + '/index/'+ index+`">
                    `+ index +`</a>
                </li>`;
            }

            // Next
            str+=`<li class="paginate_button previous disabled" id="datatable-buttons_previous">
                <a href="#" aria-controls="datatable-buttons" data-dt-idx="0" tabindex="0">Next</a>
            </li>`;

            // Last
            str+=`<li class="paginate_button previous disabled" id="datatable-buttons_previous">
                <a href="#" aria-controls="datatable-buttons" data-dt-idx="0" tabindex="0">Last</a>
            </li>`;

        str+='</ul>';

        str+='</div>';

        return str
    }
}

module.exports = Html;