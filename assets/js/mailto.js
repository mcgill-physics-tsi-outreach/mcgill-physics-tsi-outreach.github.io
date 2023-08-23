document.getElementById("JoinButton").addEventListener('click',function () {
    var FName = document.getElementById("FirstName");
    var LName = document.getElementById("LastName");
    if (FName.value && LName.value) {
    document.getElementById("JoinButton").href =
    "mailto:listserv@lists.mcgill.ca?subject=!&body=subscribe ASTROPHYSICSNEWS " +
    FName.value +
    " " +
    LName.value;
    document.getElementById("JoinButton").click();
    } else {
    document.getElementById("JoinButton").removeAttribute("href");
    }
});
