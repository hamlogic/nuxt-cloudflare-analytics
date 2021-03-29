/* eslint-disable */
if (typeof window !== 'undefined') {
    
    (function(){var s = document.getElementsByTagName("script")[0];
    var b = document.createElement("script");
    b.type = "text/javascript";b.async = true;
    b.defer = true;
    b.src = "<%= options.scriptSrc %>";
    b.dataCfBeacon = "{'token': '<%= options.token %>'}";
    s.parentNode.insertBefore(b, s);})();
}