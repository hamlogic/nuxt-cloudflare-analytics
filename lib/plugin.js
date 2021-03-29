/* eslint-disable */
;if (typeof window !== 'undefined') {

    data-cf-beacon == "{'token': '<%= options.token %>'}";
    
    (function(){var s = document.getElementsByTagName("script")[0];
    var b = document.createElement("script");
    b.type = "text/javascript";b.async = true;
    b.src = "<%= options.scriptSrc %>";
    s.parentNode.insertBefore(b, s);})();
}