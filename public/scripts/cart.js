$( document ).ready(function(){
  let foods = new Object();

  /* start processing on click */
 $(document).on("click",".add-foods",function(){
   const data      = $(this).data();          // defined data in button
   const quantity  = $(data.id).val();        // selected quqntity
   const sub_total = Math.round(data.price * quantity);  // price x quantity

   foods[data.number] = new Object();  // reset same menu
   foods[data.number] = {
      'name':data.name,
      'price':data.price,
      'quantity': quantity,
      'sub_total':sub_total,
      'id':data.number
   };
   cart_open();
  });

  function getCartInfo(menu, user, phone){
    let output = {};
    let orderInfo = [];
    for (let key in menu) {
      orderInfo.push({'dish_id': menu[key].id,'quantity': menu[key].quantity}) ;
    }
    output = {
      'userName': user,
      'phone_number': phone,
      'dishes': orderInfo
    }
    return output;
  }

  /* create html for the contents of the cart */
    const cart_open = function(){
    $("#food_list").html('');

    let html = '<ul class="list-group mb-3">';
    let key;
    let total = 0;
    for (key in foods){
      html  += '<li class="list-group-item d-flex justify-content-between lh-condensed"><div><h6 class="my-0">'+foods[key].name+' <br /><small class="text-muted">Quantity:'+foods[key].quantity+'</small></div><span class="text-muted"> $'+comma( foods[key].sub_total )+'</span></li>';
      total += foods[key].sub_total;
    }
    html += '<li class="list-group-item d-flex justify-content-between"><span>Total (USD)</span><strong>$'+comma( total )+'</strong></li>';
    html += '</ul>';

    const data = JSON.stringify(foods);
      $("#foods_list").html(html); //add html to the top of the cart.
      $("#cart_detail").show();    //open the cart.
      //$("#data").val(data);        //set POST[data] with cart contents

    $(document).on('click','#go_cart_btn',function(e){
      e.preventDefault();
      const user = $('#user').val();
      const phoneNum = $('#phoneNum').val();
      if(!user || !phoneNum){
        $('.error').fadeIn();
        $('#user, #phoneNum').on('keyup', function(){
          $('.error').fadeOut();
        });
      } else {
        const output = getCartInfo(foods, user, phoneNum);
        //console.log(output);

        $.ajax({
          url: '/orders',
          method: 'PUT',
          data: output,
          success: function(data, status, jqXHR){
            if (status !== 'success') {
              $errorMsg = 'There was an error. Please try again.';
              throw 'Request was not a success';
            } else {
              $('#go_cart').fadeout();
            }
          }
        })
      }
    });

  }
    // /* POST the form */
    // $(document).on('click','#go_cart',function() {
    //   console.log(renderCartInfo);
    //   //console.log(data);
    //   //$('#orderForm').submit();
    // });
});

function comma(num) {
  return num.toString().replace( /([0-9]+?)(?=(?:[0-9]{3})+$)/g , '$1,' );
}



