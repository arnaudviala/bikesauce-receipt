$( document ).ready(function() {
    var removeItem = function(e) {
        $(e.target).parents("li").remove();
        computeTotalPrice();
        return false;
    };
    var computeTotalPrice = function() {

        var totalPrice = Number(0.0);
        $(".items .price").each(function(i,e) {
            totalPrice += Number($(e).val());
        });
        var invalid = ( 0 == $(".items .price.invalid").length );
        $(".totalprice").toggleClass("invalid", !invalid).val(totalPrice);
        var hst = totalPrice * (1 - (100 / 113));
        $(".hstprice").toggleClass("invalid", !invalid).val(hst.toFixed(2));
    }
    var onPriceChange = function(e) {
        // 'this' is the textbox
        //console.log("New price: "+$(this).val());
        // Validate the input
        var price = Number($(this).val());
        if (isNaN(price))
        {
            $(this).addClass("invalid");
        }
        else
        {
            $(this).removeClass("invalid");
        }
        computeTotalPrice();
    };
    var addItem = function(e) {
        var a = $("<a>")
                .addClass("delete")
                .click(removeItem);
        var desc = $('<input type="text">')
                .addClass("desc")
                .val("item");
        var price = $('<input type="text">')
                .addClass("price")
                .change(onPriceChange)
                .val("0.00");
        var li = $("<li>")
                .append(a)
                .append(desc)
                .append(price)
                .appendTo($("ul.items"));
        return false;
    };
    $("a.add").click(addItem);
    $("a.delete").click(removeItem);
    $("ul.items .price").change(onPriceChange);
    computeTotalPrice();

    var d = new Date();
    var months=["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var h = d.getHours();
    var ampm = h < 12 ? "AM" : "PM";
    h = h % 12;
    var strDate = months[d.getMonth()]
                +"-"+d.getDate()
                +"-"+d.getFullYear()
                +" "+h
                +":"+d.getMinutes()
                +" "+ampm;
    $("#datetime").text(strDate);
});
