document.getElementById("JoinButton").addEventListener('click', function () {
    var FName = document.getElementById("FirstName");
    var LName = document.getElementById("LastName");
    var JoinButton = document.getElementById("JoinButton");
  
    if (FName.value && LName.value) {
      JoinButton.href =
        "mailto:listserv@lists.mcgill.ca?subject=!&body=subscribe ASTROPHYSICSNEWS " +
        encodeURIComponent(FName.value) +
        " " +
        encodeURIComponent(LName.value);
      // No manual .click() here — the browser's own default action for this
      // click already navigates to the href we just set, now that it's a
      // real mailto: link instead of "#".
    } else {
      JoinButton.removeAttribute("href");
    }
  });

