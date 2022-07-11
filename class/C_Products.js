const Html = require('./C_Html')

class Products extends Html{

    get_html_form(array=[]){
        var str='';

        array.forEach(e=>{
            if(e.element=='input'){
                str+=this.html_input(e.type, e.name, e.value, e.id, e.class, e.placeholder, e.required, e.changeTitleToSlug)
            }
            else if(e.element=='select'){
                str+=this.html_select(e.array, e.name, e.id, e.class, e.required, e.dequy)
            }
        })

        return str;
    }

    get_html_thead(){
        return `<thead>
            <tr class="headings">
                <th>
                    <input type="checkbox" id="check-all" class="flat">
                </th>
                <th class="column-title">Tên </th>
                <th class="column-title">Ngày Tạo </th>
                <th class="column-title">Hiển Thị </th>
                <th class="column-title no-link last">
                    Chức Năng
                </th>
                <th class="bulk-actions" colspan="7">
                    <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span
                            class="action-cnt"> </span> ) <i class="fa fa-chevron-down"></i></a>
                </th>
            </tr>
        </thead>`;
    }

    get_html_tbody(array=[]){
        var str='';

        array.forEach(e=>{
            // lấy ra danh sách của cấp cha
            str+='<tr class="even pointer" id="'+e._id+'">';
                str+=`<td class="a-center ">
                    <input type="checkbox" class="flat" name="table_records">
                </td>`;
                str+='<td class=" ">'+e.name+'</td>';
                str+='<td class=" ">'+e.date_created+'</td>';
                str+=`<td class=" ">
                    <input type="checkbox" name="status">
                </td>`;
                str+=`<td class=" last">
                    <a href="/admin/product/edit/`+e._id+`" class="btn btn-info btn-sm">
                        <span class="glyphicon glyphicon-edit"></span> Sửa</a>
                    <button type="button" class="btn btn-danger btn-sm" 
                        data-toggle="modal" data-target=".bs-example-modal-sm" 
                        onclick="openPopup('`+e._id+`','`+e.name+`')">
                        <span class="glyphicon glyphicon-trash"></span> Xóa</button>
                </td>`;
            str+='</tr>';
        })

        return str;
    }

    get_html_table(array=[]){
        var str='<table class="table table-striped jambo_table bulk_action">';

            str+=this.get_html_thead();

            str+='<tbody>';
            str+=this.get_html_tbody(array);
            str+='</tbody>';

        str+='</table>';

        return str;
    }
}

module.exports = Products;