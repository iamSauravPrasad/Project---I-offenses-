
class policeloggedin extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="wrapper">
    <div class="sidebar">
        <h2>OFFENSES</h2>
        <ul>
            <li><a href="../Police/PoliceHomepage.html"><i class="fas fa-home"></i>Home</a></li>
            <li><a href="../Police/PoliceProfile.html"><i class="fas fa-user"></i>Profile</a></li>
            <li><a href="../Police/PoliceAuthenticate.html"><i class="fas fa-balance-scale"></i>Reported Crimes</a></li>
            <li><a href="../Police/PoliceWithdraw.html"><i class="fas fa-balance-scale"></i>Withdraw Crimes</a></li>
            <li><a href="../Police/litigation.html"><i class="fas fa-balance-scale"></i>Litigation</a></li>
            <li><a href="../Police/Criminalload.html"><i class="fas fa-balance-scale"></i>Criminals</a></li>
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

customElements.define('policeloggedin-header', policeloggedin)


class publicloggedin extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="wrapper">
        <div class="sidebar">
            <h2>OFFENSES</h2>
            <ul class="navbar-nav">
                <li><a href="../HTML/Homepage.html"><i class="fas fa-home"></i>Home</a></li>
                <li><a href="../HTML/Public/publicprofile.html"><i class="fas fa-user"></i>Profile</a></li>
                <li><a href="../HTML/PoliceAuthenticate.html"><i class="fas fa-balance-scale"></i>Crimes</a></li>
                <li><button type="button" onclick="logout();">logout</button></li>
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


customElements.define('ploggedin-header', publicloggedin)


class publicnotloggedin extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="wrapper">
    <div class="sidebar">
        <h2>OFFENSES</h2>
        <ul class="navbar-nav">
            <li><a href="../HTML/Homepage.html"><i class="fas fa-home"></i>Home</a></li>
            <li><a href="../HTML/PoliceProfile.html"><i class="fas fa-user"></i>Profile</a></li>
             <li><a href="../HTML/PoliceAuthenticate.html"><i class="fas fa-balance-scale"></i>Crimes</a></li>
            
            

            <li class="dropdown">
    <a href="javascript:void(0)" class="dropbtn"><i class="fas fa-balance-scale"></i>Dropdown</a>
    <div class="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </li>


            
            <li><button id="butt" type="button">login</button></li>

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


customElements.define('pnotloggedin-header', publicnotloggedin)




