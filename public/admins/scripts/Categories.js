class Categories extends Admin{
    processForm(){
        // khai báo biến
        var name = slug = parents = error = '', flag = 1;

        // lấy dữ liệu
        name = $('#name').val();
        slug = $('#slug').val();
        parents = $('#parents').val();

        // kiểm tra dữ liệu
        if(name==''){
            flag=0;
            $('.error_name').text('Vui lòng nhập Tên')
        }
        else{
            $('.error_name').text('')
        }

        if(slug==''){
            flag=0;
            $('.error_slug').text('Vui lòng nhập Slug')
        }
        else{
            $('.error_slug').text('')
        }

        // Tổng kết
        if(flag==1){
            this.send_ajax( url, {name, slug, parents} )
        }
    }
}