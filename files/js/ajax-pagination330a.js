jQuery(document).ready(function ($) {

  function find_page_number(element) {
    element.find('span').remove();
    return parseInt(element.html());
  }

  $(document).on('click', '.pagination li a', function (event) {
    event.preventDefault();

    var categoria = "";
    var searchingVal = $('#SearchBox').val() ? $('#SearchBox').val() : '';
    page = find_page_number($(this).clone());
    var categoria = $('#SelectCatFilter').val() ? $('#SelectCatFilter').val() : '';

    data = {
      action: 'ajax_pagination',
      query_vars: '{"post_type":"post","post_status":"publish","posts_per_page":2,"paged":2',
      page: page,
      categoria: categoria,
      searching: searchingVal
    }

    $.ajax({
      url: paginationajax.ajaxurl,
      type: 'post',
      data: data,
      beforeSend: function () {
        $(document).scrollTop();
        $('#ResponseFilter').html(' ');
        $('.loader').addClass('active');
      },
      success: function (html) {
        $('html,body').animate({
          scrollTop: 0
        }, 'slow');
        $('.loader').removeClass('active');
        $('.pagination').remove();
        $('#ResponseFilter').html(html);
        i = 1;
        $(".pagination >li").each(function () {
          if (i == page) {
            $(".pagination >li").removeClass('active');
            active = page - 1;
            $(".pagination >li:eq(" + active + ")").addClass('active');
          }
          i++;

        });
      },
      error: function (e) {
        console.log(e);
      }
    })
  });

  $(document).on('click', '.handleCatCtrl', function (event) {
    event.preventDefault();
    var searchingVal = $('#SearchBox').val() ? $('#SearchBox').val() : '';
    page = find_page_number($(this).clone());

    var _this = $(this),
      dataCatID = _this.hasClass('active') ? _this.attr('datafilterid') : [];
    $('#SelectCatFilter').val(dataCatID);

    var categoria = $('#SelectCatFilter').val();

    data = {
      action: 'ajax_pagination',
      categoria: categoria,
      searching: searchingVal,
      page: 1,
    }

    $.ajax({
      url: paginationajax.ajaxurl,
      type: 'post',
      data: data,
      beforeSend: function () {
        $(document).scrollTop();
        $('#ResponseFilter').html(' ');
        $('.loader').addClass('active');
      },
      success: function (html) {
        $('html,body').animate({
          scrollTop: 0
        }, 'slow');
        $('.pagination').remove();
        $('#ResponseFilter').html(html);
        $('.loader').removeClass('active');
        i = 1;
        $(".pagination >li").each(function () {
          if (i == page) {
            $(".pagination >li").removeClass('active');
            $(".pagination >li:eq(" + i + ")").addClass('active');
          }
          i++;

        });

      },
      error: function (e) {
        console.log(e);
      }
    })

  });


  $('.pagination li.disabled a').on('click', function (e) {
    e.preventDefault();
  });

  $('#Buscador').submit(function (e) {
    e.preventDefault();
    var filter = $('#Buscador');
    var inputField = $('#SearchBox').val() ? $('#SearchBox').val() : '';
    var contentResponse = $('#ResponseFilter');
    var categoria = $('#SelectCatFilter').val() ? $('#SelectCatFilter').val() : '';
    var searchingVal = $('#SearchBox').val() ? $('#SearchBox').val() : '';
    page = find_page_number($(this).clone());

    data = {
      action: 'ajax_pagination',
      query_vars: '{"post_type":"post","post_status":"publish","posts_per_page":2,"paged":2',
      page: page,
      categoria: categoria,
      searching: searchingVal
    }

    $.ajax({
      url: paginationajax.ajaxurl,
      type: 'post',
      data: data,
      type: filter.attr('method'),
      beforeSend: function () {
        $(document).scrollTop();
        //$('.notasWrap').html( '<div class="loaderNota"><i class="fas fa-spinner fa-spin"></i></div>' );
      },
      success: function (html) {
        $('html,body').animate({
          scrollTop: 0
        }, 'slow');
        $('.pagination').remove();
        $('#ResponseFilter').html(html);
        i = 1;
        $(".pagination >li").each(function () {
          if (i == page) {
            $(".pagination >li").removeClass('active');
            active = page - 1;
            $(".pagination >li:eq(" + active + ")").addClass('active');
          }
          i++;

        });
      },
      error: function (e) {
        console.log(e);
      }
    })

  });

});