    let countDownDate = 0; 
    let countdownStarted = false;

    function setCountdown() {
      
      const userInput = document.getElementById("countdownDate").value;

      if (userInput) {
        countDownDate = new Date(userInput).getTime();

        startCountdown();

        document.querySelector(".animation-container").style.display = "block";

        document.getElementById("message").innerHTML = "";
      } else {
        document.getElementById("message").innerHTML = "Please enter a valid date and time.";
      }
    }

    function startCountdown() {
      countdownStarted = true; 

      const x = setInterval(function() {
        const now = new Date().getTime();

        const distance = countDownDate - now;

        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the countdown only if it has started
        if (countdownStarted) {
          document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        // If the countdown is over, display a message and perform an action
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("countdown").innerHTML = "00d 00m 00h 00s";
          document.getElementById("message").innerHTML = "Countdown complete!";
          stopAnimation();
        }
      }, 1000);
    }

    function stopAnimation() {
      // Stop the animation by removing the animation property
      document.querySelector(".animation-container").style.display = "none";
    }