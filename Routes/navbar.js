class policeloggedin extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="wrapper">
    <div class="sidebar">
        <h2>OFFENSES</h2>
        <ul>
            <li><a href="../HTML/PoliceHomepage.html"><i class="fas fa-home"></i>Home</a></li>
            <li><a href="../HTML/PoliceProfile.html"><i class="fas fa-user"></i>Profile</a></li>
            <li><a href="../HTML/PoliceAuthenticate.html"><i class="fas fa-balance-scale"></i>Reported Crimes</a></li>
            <li><a href="../HTML/PoliceWithdraw.html"><i class="fas fa-balance-scale"></i>Withdraw Crimes</a></li>
            <!-- <li><a href="#"><i class="fas fa-blog"></i>Blogs</a></li>
            <li><a href="#"><i class="fas fa-address-book"></i>Contact</a></li> -->
            <li><a href="#"><i class="fas fa-map-pin"></i>Map</a></li>
        </ul> 
        <!-- <div class="social_media">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div> -->
    </div>`
    }
}

customElements.define('my-header', policeloggedin)


class publicloggedin extends HTMLElement{
    connectedCallback() {
        this.innerHTML = `
        <div class="wrapper">
    <div class="sidebar">
        <h2>OFFENSES</h2>
        <ul>
            <li><a href="../HTML/Homepage.html"><i class="fas fa-home"></i>Home</a></li>
            <li><a href="../HTML/PoliceProfile.html"><i class="fas fa-user"></i>Profile</a></li>
            <li><a href="../HTML/PoliceAuthenticate.html"><i class="fas fa-balance-scale"></i>Reported Crimes</a></li>
            <li><a href="../HTML/PoliceWithdraw.html"><i class="fas fa-balance-scale"></i>Withdraw Crimes</a></li>
            <!-- <li><a href="#"><i class="fas fa-blog"></i>Blogs</a></li>
            <li><a href="#"><i class="fas fa-address-book"></i>Contact</a></li> -->
            <li><a href="#"><i class="fas fa-map-pin"></i>Map</a></li>
        </ul> 
        <!-- <div class="social_media">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div> -->
    </div>`
    }
}