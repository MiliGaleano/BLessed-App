// Firebase configuration
  let firebaseConfig = {
    apiKey: "AIzaSyCnzH9HW0StkfbD4cu2laEUEXvxUvih1ng",
    authDomain: "blessed-e4d26.firebaseapp.com",
    databaseURL: "https://blessed-e4d26.firebaseio.com",
    projectId: "blessed-e4d26",
    storageBucket: "blessed-e4d26.appspot.com",
    messagingSenderId: "662095771323",
    appId: "1:662095771323:web:f5503fd98ed469f3179b9e"
  };
  
// Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    let db = firebase.firestore();
    let storage = firebase.storage();
    let storageRef = firebase.storage().ref();

//create user

  function handleSignUp() {
    let email = document.getElementById('usermail').value;
    let password = document.getElementById('userpassword').value;
    if (email.length < 4) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a valid password.');
      return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        sessionStorage.setItem("useremail", email);
        console.log('mail saved!');
      }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END createwithemail]
  }


// log in
    function toggleSignIn() {
        if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
        } else {
        let email = document.getElementById('usermail').value;
        let password = document.getElementById('userpassword').value;
        // sessionStorage.setItem("useremail", email);
        if (email.length < 4) {
            alert('Please enter a valid email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a valid password.');
            return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
            sessionStorage.setItem("useremail", email);
            console.log('mail saved!');
          }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
            } else {
            alert(errorMessage);
            }
            console.log(error);
            document.getElementById('loginbtn').disabled = false;
            // [END_EXCLUDE]
        });
        // [END authwithemail]
        }
        document.getElementById('loginbtn').disabled = true;
    }



// forgot password
  function sendPasswordReset() {
    let email = document.getElementById('usermail').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Password Reset Email Sent!');
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
  }

// init app
 /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */

    function initApp() {
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
          // [START_EXCLUDE silent]
        //   document.getElementById('quickstart-verify-email').disabled = true;
        console.log(user);
          // [END_EXCLUDE]
          if (user) {
            if(window.location.pathname.split("/").pop() !== 'index.html'){
              location.assign('index.html');
            }
              console.log(user);
    //   if (user) {
    //     // sessionStorage.setItem("useremail2", user.uid);
    //     console.log(user.uid);
    //     location.assign('index.html');
            // User is signed in.
            let displayName = user.displayName;
            let email = user.email;
            let emailVerified = user.emailVerified;
            let photoURL = user.photoURL;
            let isAnonymous = user.isAnonymous;
            let uid = user.uid;
            let providerData = user.providerData;
            // [START_EXCLUDE]
            // document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            // document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            // document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            // if (!emailVerified) {
            // //   document.getElementById('quickstart-verify-email').disabled = false;
            // }
            // [END_EXCLUDE]
           } else {
            //  User is signed out.
            console.log("no hay sesion");
        // if (window.location.pathname.split("/").pop() !== "registration.html"){
        //     location.assign('registration.html');
        // }
            // console.log(window.location.pathname.split("/").pop());
            // if (location)
            // location.assign('registration.html');
            // [START_EXCLUDE]
            // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            // document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            // document.getElementById('quickstart-account-details').textContent = 'null';
            // [END_EXCLUDE]
          }
          // [START_EXCLUDE silent]
          document.getElementById('loginbtn').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authstatelistener]
  
        document.getElementById('loginbtn').addEventListener('click', toggleSignIn, false);
        document.getElementById('signupbtn').addEventListener('click', handleSignUp, false);
        // document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
        document.getElementById('buttonforgot').addEventListener('click', sendPasswordReset, false);
      }

//   on load init app
      window.onload = function() {
        initApp();
      };

// sign out
      function cerrarSesion(){
        firebase.auth().signOut();
        }

cerrarSesion();

// open menu
function showmenu() {
    document.getElementById("divhamb").style.display = "flex";
    document.getElementById("iconham").setAttribute("onclick", "closemenu()");
}
function closemenu() {
    document.getElementById("divhamb").style.display = "none";
    document.getElementById("iconham").setAttribute("onclick", "showmenu()");
}

// open modal rate
    function rateBL(x,y) {
        document.getElementById("modalrate").style.display= "block";
        sessionStorage.setItem('thisnamerate', x);
        document.getElementById("rateh1").innerHTML = "How did you like " + x + "?";
        console.log(y);
        document.getElementById("buttonratedone").setAttribute("onclick", "rateabl('"+y+"')");
    }

// get rate
    function rateabl(idofbl) {
        let option = document.getElementsByClassName('radioinprate');
            if (!(option[0].checked || option[1].checked || option[2].checked || option[3].checked || option[4].checked || option[5].checked || option[6].checked || option[7].checked || option[8].checked || option[9].checked)) {
                alert("please rate the BL");
                return false;
            } else {
        let getelements = document.getElementById('blrated').elements;
        let blrating = getelements['blrate'].value;
        console.log(blrating);
        watchedList(idofbl, blrating);
                }
        document.getElementById('modalrate').style.display = "none";
    }

//   create db user
//   watched list
    function watchedList(idofbl, x){
        starnumb = parseInt(x);
        let newstars = [];
        let usermail = sessionStorage.getItem("useremail");
        let namerate = sessionStorage.getItem('thisnamerate');
        console.log(usermail);

        let dataUser = {
            stars: starnumb,
            fav: "no"
        }
        db.collection('users').doc(usermail).collection('watched').doc(idofbl).set(dataUser)
        .then(function(docRef) {
        console.log("OK!");
        document.getElementById('svgwatchedicon').setAttribute("class", "svgwatchedicon svgchecked");
        document.getElementById('svgwatchedicon').setAttribute("onclick", "deleteWatched('" + namerate + "', '" + idofbl + "')");
        document.getElementById("svgeyewatch").style.display= "none";
        document.getElementById("svgheart"+idofbl).style.display= "flex";
        document.getElementById('svgheart'+idofbl).setAttribute("onclick", "addFav('"+ namerate + "', '" + idofbl + "')");
        document.getElementById(idofbl+"div").style.display= "none";
        })
        .catch(function(error) {
        console.log("Error: " + error);
        })

        db.collection('listOfBLs').where('__name__',"==",idofbl).get().then((query) => {  
            const thing = query.docs[0];
            console.log(thing);
            console.log(thing.data().stars);
            for (let i = 0; i < thing.data().stars.length; i++) {
                newstars.push(thing.data().stars[i]);
            }                                               
            newstars.push(starnumb);
            thing.ref.update({stars:newstars});
        })
        .catch(function(error) {
            console.log("Error: " , error);
            });

        db.collection('users').doc(usermail).collection('watchlist').doc(idofbl).delete()
        .then(function() {
        console.log("deleted!");
        })
        .catch(function(error) {
        console.error("Error: ", error);
        });    
    }

// delete watched
// modal sure
    function deleteWatched(x,y) {
        document.getElementById("modalsurew").style.display= "block";
        sessionStorage.setItem('thisidw', y);
        sessionStorage.setItem('thisnamew', x);
        document.getElementById("modalh1w").innerHTML = "Are you sure you want to delete " + x + " from watched list?";
    }
    function modaloutw() {
        document.getElementById("modalsurew").style.display= "none";
    }
// delete watched
    function yeseliminatew() {
        let data = sessionStorage.getItem('thisidw');
        let dataname = sessionStorage.getItem('thisnamew');
        let restfav = 0;
        let userfav;
        let userstar;
        let newstars = [];
        let usermail = sessionStorage.getItem("useremail");
        // delete from user watched list
        db.collection('users').doc(usermail).collection('watched').where('__name__',"==",data).get().then((query) => {  
            const thing = query.docs[0];
            console.log(thing);
            userfav = thing.data().fav;
            console.log(userfav);
            userstar = thing.data().stars;
            console.log(userstar);
        }).then(function(){
            db.collection("users").doc(usermail).collection('watched').doc(data).delete()
            .then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });   

        // if fav delete
        db.collection('listOfBLs').where('__name__',"==",data).get().then((query) => {  
            const thing = query.docs[0];
            console.log(thing);
            console.log(thing.data().favs);
            // stars = thing.data().stars;
            restfav = thing.data().favs;  
            if (userfav == "yes") {                                             
            let newfav = restfav - 1;
            thing.ref.update({favs:newfav});
            }
        })
        .catch(function(error) {
            console.log("Error: " , error);
            });

        // delete rate
        db.collection('listOfBLs').where('__name__',"==",data).get().then((query) => {  
            const thing = query.docs[0];
            console.log(thing);
            console.log(thing.data().stars);
            for (let i = 0; i < thing.data().stars.length; i++) {
                newstars.push(thing.data().stars[i]);
            }                        
            let deletestar = newstars.indexOf(userstar);
            if (deletestar > -1 )  {                   
            newstars.splice(deletestar,1)
            }
            thing.ref.update({stars:newstars});
        })
        .catch(function(error) {
            console.log("Error: " , error);
            });

        document.getElementById("modalsurew").style.display= "none";
        document.getElementById("svgeyewatch").style.display= "flex";
        document.getElementById("svgheart"+data).style.display= "none";
        document.getElementById('svgwatchedicon').setAttribute("class", "svgwatchedicon");
        document.getElementById('svgwatchedicon').setAttribute("onclick", "rateBL('" + dataname + "', '" + data + "')");
        document.getElementById(data+"img").style.display="none";
    }

// send to watchlist
    function watchList(idofbl){
        let usermail = sessionStorage.getItem("useremail");
        let towatch = {};
        db.collection('users').doc(usermail).collection('watchlist').doc(idofbl).set(towatch)
        .then(function(docRef) {
            document.getElementById('eyewatch').setAttribute("class", "eyewatch");
            document.getElementById('eyewatch1').setAttribute("class", "eyewatch");
            document.getElementById('eyewatch2').setAttribute("class", "eyewatch eye");
            document.getElementById('svgeyewatch').setAttribute("onclick", "updatewatchList('" +idofbl+ "')");
        console.log("OK!");
        }).catch(function(error) {
        console.log("Error: " + error);
        })
    }
    
// delete watchlist
    function updatewatchList(idofbl){
        let usermail = sessionStorage.getItem("useremail");
        var db = firebase.firestore();
        db.collection('users').doc(usermail).collection('watchlist').doc(idofbl).delete()
        .then(function() {
        console.log("deleted!");
        document.getElementById('svgeyewatch').setAttribute("onclick", "watchList('" +idofbl+ "')");
        document.getElementById('eyewatch').setAttribute("class", "");
        document.getElementById('eyewatch1').setAttribute("class", "");
        document.getElementById('eyewatch2').setAttribute("class", "");
        document.getElementById(idofbl+"div").style.display="none";
        })
        .catch(function(error) {
        console.error("Error: ", error);
        });
    }

// add Fav
    function addFav(x,idofbl) {
        document.getElementById("svgheart"+idofbl).setAttribute("class", "svgheart favsvg");
        document.getElementById('svgheart'+idofbl).setAttribute("onclick", "deleteFav('" + x + "', '" + idofbl + "')");
        let addfav = 0;
        let newfav;
        let usermail = sessionStorage.getItem("useremail");
        db.collection("users").doc(usermail).collection('watched').doc(idofbl).update({
        fav: "yes" })
        .then(function() {
        console.log("actualizado ok");
        })
        .catch(function(error) {
        console.log("Error: " + error);
        });

        db.collection('listOfBLs').where('__name__',"==",idofbl).get().then((query) => {  
            const thing = query.docs[0];
            console.log(thing);
            console.log(thing.data().favs);
            addfav = thing.data().favs;  
            console.log(addfav);
            newfav = addfav + 1;                                 
            thing.ref.update({favs:newfav});
        })
        .catch(function(error) {
            console.log("Error: " , error);
            });
    }

// delete Fav
// modal sure
    function deleteFav(x, y) {
        document.getElementById("modalsure").style.display= "block";
        sessionStorage.setItem('thisid', y);
        sessionStorage.setItem('thisname', x);
        document.getElementById("modalh1").innerHTML = "Are you sure you want to delete " + x + " from favourites?";
    }

    function modalout() {
        document.getElementById("modalsure").style.display= "none";
    }

// delete fav
    function yeseliminate() {
        let data = sessionStorage.getItem('thisid');
        let dataname = sessionStorage.getItem('thisname');
        let restfav = 0;
        let usermail = sessionStorage.getItem("useremail");
        // update in user watchedlist
        db.collection("users").doc(usermail).collection('watched').doc(data).update({
        fav: "no" })
        .then(function() {
        console.log("actualizado ok");
        })
        .catch(function(error) {
        console.log("Error: " + error);
        });

        // update in list of bl
        db.collection('listOfBLs').where('__name__',"==",data).get().then((query) => {  
            const thing = query.docs[0];
            console.log(thing);
            console.log(thing.data().favs);
            restfav = thing.data().favs;                                               
            let newfav = restfav - 1;
            thing.ref.update({favs:newfav});
        })
        .catch(function(error) {
            console.log("Error: " , error);
            });

        document.getElementById("modalsure").style.display= "none";
        document.getElementById("svgheart"+data).setAttribute("class", "svgheart");
        document.getElementById('svgheart'+data).setAttribute("onclick", "addFav('"+ dataname + "', '" + data + "')");
        document.getElementById(data+"div").style.display="none";
    }

// create collection series

            //   let bldata = {
            //     name: "Itsuka no Kimi e",
            //     country: "Japan",
            //     year: 2007,
            //     description: "Fukami Noboru is a lonely and introverted college student who saves one of his classmates, Hayase Kouhei, from drowning on a lake. Hayase had never paid attention to Noboru before, but after being saved by him he begins to feel confused about his feelings towards the very mysterious Noboru.",
            //     category: "movie",
            //     tocry: "no",
            //     stars: [],
            //     favs:0,
            //     link: "",
            //     age: "uni",
            //     full: "yes",                
                                            
            //     timestamp:firebase.firestore.FieldValue.serverTimestamp()
            //     };
            // db.collection("listOfBLs").doc("itsukanokimie").set(bldata)
            // .then(function(docRef) {
            // console.log("OK!");
            // })
            // .catch(function(error) {
            // console.log("Error: " + error);
            // });

function hideGifLoading() {
    $(".loading").fadeOut(500);
}

// open search form
    function openformsearch() {
        console.log(screen.width);
        document.getElementById("formsearch").style.display= "flex";
        document.getElementById("glass").style.display= "none";
        document.getElementById("opensearch").style.animationName= "searchopen";
        if (screen.width < 790 ){
            document.getElementById("opensearch").style.width= "45vw";
        }
        else {
            document.getElementById("opensearch").style.width= "360px";
        }
        document.getElementById("inputsearch").style.animationName= "inputanimation";
    }   
    function closeformsearch() {
        console.log("clcikeado");
        let listsearch = document.getElementById("prueba");
        while (listsearch.firstChild) {listsearch.removeChild(listsearch.firstChild);}
        if (screen.width < 790 ){
            document.getElementById("opensearch").style.width= "8vw";
        }
        else {
            document.getElementById("opensearch").style.width= "33px";
        }
        document.getElementById("inputsearch").value = "";
        document.getElementById("formsearch").style.display= "none";
        document.getElementById("glass").style.display= "flex";
        document.getElementById("opensearch").style.animationName= "";
    }

let allBLs = [];
let allBLsid = [];
// array with all the bls
    function getAllTheBLs(){
        db.collection('listOfBLs').get()
        .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            allBLs.push(doc.data().name);
            allBLsid.push(doc.id);
        });
        })
        .catch(function(error) {
        console.log("Error: " , error);
        })
    }

let indexmessage = "Sorry, there's no bl with that name";
let favsmessage = "Sorry, there's no bl with that name in your favs list";
let watchedmessage = "Sorry, there's no bl with that name in your watched list";
let watchlistmessage = "Sorry, there's no bl with that name in your watchlist";
let optionsmessage = "Sorry, there's no bl with that name in this category";

// function search
    function searchHome(x,y,z,w) {
        let searched = document.getElementById('inputsearch').value;
        let listsearch = document.getElementById(x);
        listsearch.style.display = "block";
        while (listsearch.firstChild) {listsearch.removeChild(listsearch.firstChild);}
            for (let i = 0; i < searched.length; i++) {
                while (listsearch.firstChild) {listsearch.removeChild(listsearch.firstChild);}
                let div = document.createElement('div');
                div.setAttribute("id", "divsearch");
                listsearch.appendChild(div);
                let nameofblsearched = [];
                let idofblsearched = [];
                for (let j = 0; j < y.length; j++) {
                    if (y[j].toUpperCase().search(searched.toUpperCase()) !== -1) {
                        nameofblsearched.push(y[j]);
                        idofblsearched.push(z[j]);
                    }
                }
                let ul = document.createElement('ul');
                div.appendChild(ul);
                if (nameofblsearched.length === 0) {
                    let li = document.createElement('li');
                        ul.appendChild(li);
                        li.innerHTML = w;
                        li.setAttribute("class", "listsuggestion");
                } else {
                        nameofblsearched.forEach(function (value, item) {
                            let li = document.createElement('li');
                            ul.appendChild(li);
                            li.innerHTML += value;
                            li.setAttribute("id", idofblsearched[item]);
                            li.setAttribute("onclick", "modalseries(this)");
                            li.setAttribute("class", "listsuggestion");
                            });
                        }
                }
    }

// fill stars
    function halfstarclass(x, item) {
        for (let i = 0; i < Math.floor(x); i++) {
            document.getElementById("star" + item + i).setAttribute("class", "star filled modalstar");
            // console.log(x);
        }
        if (Number.isInteger(x) === false) {
            let fixedx = x.toFixed(2);

            if (fixedx-Math.floor(x) >= 0.25 && fixedx-Math.floor(x) <= 0.85) {
            document.getElementById("star" + item + (Math.floor(x))).setAttribute("class", "star half modalstar");
            }
            else if (fixedx-Math.floor(x) > 0.85) {
                document.getElementById("star" + item + (Math.floor(x))).setAttribute("class", "star filled modalstar");
                }
        }
    }

// stars average
    function starAverage(x, y, z){
        let allthestars = 0;
        if (x.length !== 0) {
            for(let i = 0; i < x.length; i++){
                allthestars += x[i];
            }
            y = allthestars / x.length;
            // console.log(y);
            halfstarclass(y/2, z);
        } else {
            halfstarclass(0, z);
        }
    }

let newsList = [];
let newsListYear = [];

// get list of recently added
    function getNewsList(){
        let newsSlider = db.collection("listOfBLs").orderBy("timestamp", "desc").limit(10);
        newsSlider.get()
        .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        newsList.push(doc.id);
        newsListYear.push(doc.data().year);
        });
        crateSliderNews(newsList, newsListYear);
        })
        .catch(function(error) {
        console.log("Error: " , error);
        })
    }

let favsList = [];
let favsListNum = [];

// get list of favs
    function getFavsList(){
        let favsSlider = db.collection("listOfBLs").orderBy("favs", "desc").limit(10);
        favsSlider.get()
        .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        favsList.push(doc.id);
        favsListNum.push(doc.data().favs);
        });
        crateSliderFavs(favsList, favsListNum);
        })
        .catch(function(error) {
        console.log("Error: " , error);
        })
    }

let topList = [];
let topListStars = [];

// get list of top rated
    function getTopList(){
        let topSlider = db.collection("listOfBLs");
        topSlider.get()
        .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        starstop = doc.data().stars;
        let starsavtop = 0;
        let allthestars = 0;
            if (starstop.length !== 0) {
                for(let i = 0; i < starstop.length; i++){
                    allthestars += starstop[i];
                }
                starsavtop = allthestars / starstop.length;
                topListStars.push(starsavtop);
                topList.push(doc.id);
        }
        });   
        crateSliderTop(topList, topListStars);
        console.log(topList);
        console.log(topListStars);
        })
        .catch(function(error) {
        console.log("Error: " , error);
        })
    }

function getAllSliders() {
        getNewsList();
        getFavsList();
        getTopList();
        getAllTheBLs();
    }

// CREATE SLIDER NEWS
    function crateSliderNews(x,y){
        let getDiv = document.getElementById('sliderNews');
        getDiv.setAttribute("class", "swiper-container slidernews")
        let divcont = document.createElement('div');
        divcont.setAttribute("class", "swiper-wrapper");
        getDiv.appendChild(divcont);
        for (let i = 0; i < x.length; i++) {
            let div2 = document.createElement('div');
            div2.setAttribute("class", "swiper-slide");
            divcont.appendChild(div2);
            let div3 = document.createElement('div');
            div2.appendChild(div3);
            let imgbl = document.createElement('img');
                let gsReference = storage.refFromURL('gs://blessed-e4d26.appspot.com/'+ x[i] +'.jpg');
                gsReference.getDownloadURL()
                    .then(function(url) {
                    imgbl.setAttribute("src", url);
                }).catch(function(error) {
                    console.log("Error: ", error);
                }); 
            imgbl.setAttribute("onclick", "modalseries(this)");
            imgbl.setAttribute("id", x[i]);
            div3.appendChild(imgbl);
            let div4 = document.createElement('div');
            div4.setAttribute("class", "favcounta flex");
            div3.appendChild(div4);
            let h1 = document.createElement('h1');
            h1.setAttribute("class", "titlelist");
            h1.setAttribute("id", x[i]);
            h1.innerHTML = y[i];
            div4.appendChild(h1);
        }

        var swiper3 = new Swiper('.slidernews', {
            slidesPerView: 'auto',
            spaceBetween: 30,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
          });
    }

// CREATE SLIDER FAVS
    function crateSliderFavs(x,y){
        let getDiv = document.getElementById('sliderFavs');
        getDiv.setAttribute("class", "swiper-container sliderfav")
        let divcont = document.createElement('div');
        divcont.setAttribute("class", "swiper-wrapper");
        getDiv.appendChild(divcont);
        for (let i = 0; i < x.length; i++) {
            let div2 = document.createElement('div');
            div2.setAttribute("class", "swiper-slide");
            divcont.appendChild(div2);
            let div3 = document.createElement('div');
            div2.appendChild(div3);
            let imgbl = document.createElement('img');
                let gsReference = storage.refFromURL('gs://blessed-e4d26.appspot.com/'+ x[i] +'.jpg');
                gsReference.getDownloadURL()
                    .then(function(url) {
                    imgbl.setAttribute("src", url);
                }).catch(function(error) {
                    console.log("Error: ", error);
                }); 
            imgbl.setAttribute("onclick", "modalseries(this)");
            imgbl.setAttribute("id", x[i]);
            div3.appendChild(imgbl);
            let div4 = document.createElement('div');
            div4.setAttribute("class", "favcounta flex");
            div3.appendChild(div4);
            let svgfavs = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgfavs.setAttribute("version", "1.1");
            svgfavs.setAttribute("class", "favsheartlist");
            svgfavs.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svgfavs.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            svgfavs.setAttribute("x", "0px");
            svgfavs.setAttribute("y", "0px");
            svgfavs.setAttribute("viewBox", "0 0 310 310");
            svgfavs.setAttribute("style", "enable-background:new 0 0 310 310;");
            svgfavs.setAttribute("xml:space", "preserve");
            div4.appendChild(svgfavs);
            let gfav = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svgfavs.appendChild(gfav);
            let ellipsefav = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            ellipsefav.setAttribute("class", "favsheart");
            ellipsefav.setAttribute("cx", "71.4");
            ellipsefav.setAttribute("cy", "34.5");
            ellipsefav.setAttribute("rx", "23.7");
            ellipsefav.setAttribute("ry", "15.8");
            gfav.appendChild(ellipsefav);
            let pathfav1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathfav1.setAttribute("class", "favsheart1");
            pathfav1.setAttribute("d", "M148.5,12.8c2.3,0.6,4.5,1.3,6.8,1.8c21.1,5.3,36.3,22.9,39.5,46.1c0.6,4.4,2,7.6,5.8,10.2 c3.5,2.4,6.3,5.8,9.6,8.9c0.3-0.2,0.8-0.6,1.2-1.1c19-25.4,59.3-23.4,77.4,6c13,21,11.7,43,2.5,64.9 c-12.3,29.2-33.2,51.2-59.1,68.8c-4.1,2.8-8.5,5.3-12.6,8c-6.3,4.1-12.6,4.1-18.9,0.1c-4.1-2.5-8.2-5-12.8-7.8 c-0.8,1.5-1.6,2.7-2.3,4c-15.8,31.8-40.8,54.7-71.2,72c-4.7,2.7-9.6,3.1-14.3,0.4c-34.7-19.5-63-45-76.6-83.8 c-2.2-6.4-3.5-13.2-5.3-19.8c0-4.1,0-8.3,0-12.4c0.4-1.1,1-2.2,1.1-3.3c2.3-16.5,9.9-29.8,23.8-39.3c0.7-0.4,1.2-1.1,1.6-1.5 c-0.1-0.6-0.1-0.8-0.2-0.9c-1.6-2.3-3.2-4.5-4.7-6.7c-12.3-18.5-21.1-38.1-20.5-61C20,42.2,35.3,22,58.6,15c1.7-0.5,3.3-1.5,5-2.2 c4.1,0,8.3,0,12.4,0c1.6,0.6,3.1,1.5,4.7,1.9c10,2.3,17.9,7.7,24.2,15.6c0.6,0.8,1.4,1.4,2.5,2.4c6.8-9.3,15.4-15.4,26.4-18 c2.5-0.6,4.9-1.2,7.3-1.8C143.6,12.8,146,12.8,148.5,12.8z M186.8,77.9c-0.2,0.3-0.3,0.6-0.5,0.8c-4.9-2.4-9.6-5.2-14.7-7.1 c-2.6-1-6.1-1.5-8.7-0.7c-15.2,4.3-25,14.5-30.1,29.3c-5.9,17.3-2.4,33.7,4.7,49.7c14.1,32,39,53.6,68.6,70.6c3.6,2.1,6.7,1,9.6-1 c10.9-7.8,22.4-15,32.4-23.8c18.4-16.4,32.6-35.8,39.5-60c4.9-17.1,3.2-33.2-6.8-47.9c-17.2-25.2-53.3-25-67.4,3.1 c-0.7,1.5-1.7,2.8-2.9,4.8c-8.1-10.5-14.4-22.7-30.5-25C182.9,73.7,184.9,75.8,186.8,77.9z M179.9,215.5 c-11.5-11.7-22.7-22.2-32.7-33.7c-10.1-11.5-16.7-25.4-22.1-41.1c-4,3.9-7.5,6.8-10.2,10.2c-2.8,3.5-5,7.6-7.7,11.9 c-3.4-4.6-6.5-8.9-9.8-13c-7.7-9.4-17.8-13.9-30-13.1c-17.5,1.2-32.4,13.8-38,31.2c-6,18.3-1.7,35.4,6,52 c14.3,30.6,38.6,51.4,67.2,67.9c3.8,2.2,7.1,1.1,10.1-1.1c12.3-9.1,25.1-17.6,36.5-27.8C162.8,246.6,173.2,231.5,179.9,215.5z M106,147.1c5-4.3,9.2-8.4,13.9-11.8c2.6-1.8,2.9-3.6,2.8-6.4c-0.2-7.5-0.8-15.2,0.2-22.6c3.8-26.5,26.5-46.2,52-45.5 c3.8,0.1,7.7,1.1,11.5,1.8c-0.2-15.2-11.7-32.2-26.6-37.8c-24.2-9.2-40.7,1.1-51.8,22.8c-4.6-5.7-8.4-11-12.8-15.9 c-5.2-5.8-11.4-8.5-17.5-8.4c2.4,2.5,4.6,4.9,6.8,7.2c-5.6-1.8-10.4-4.6-15.5-6.5c-2.6-1-6.1-1.5-8.7-0.8 c-19.3,5.2-32.5,22.8-33,43.9c-0.5,23.8,9.6,43.7,23.8,61.9c1,1.3,4.3,1.6,6.2,1.1c8.2-2.2,16.2-2.3,24.4,0 C92,132.9,99.7,139,106,147.1z");
            gfav.appendChild(pathfav1);
            let pathfav2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathfav2.setAttribute("class", "favsheart");
            pathfav2.setAttribute("d", "M186.8,77.9c-2-2.1-3.9-4.2-6.9-7.4c16.1,2.3,22.4,14.4,30.5,25c1.2-1.9,2.2-3.3,2.9-4.8 c14.1-28.1,50.2-28.3,67.4-3.1c10,14.7,11.7,30.9,6.8,47.9c-6.9,24.2-21.1,43.6-39.5,60c-10,8.9-21.5,16-32.4,23.8 c-2.9,2.1-6,3.1-9.6,1c-29.7-16.9-54.5-38.6-68.6-70.6c-7-15.9-10.6-32.4-4.7-49.7c5.1-14.8,14.9-25,30.1-29.3 c2.7-0.7,6.1-0.3,8.7,0.7c5.1,2,9.8,4.7,14.7,7.1C186.5,78.5,186.7,78.2,186.8,77.9z");
            gfav.appendChild(pathfav2);
            let pathfav3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathfav3.setAttribute("class", "favsheart");
            pathfav3.setAttribute("d", "M179.9,215.5c-6.7,16-17.1,31.1-30.8,43.3c-11.3,10.2-24.2,18.7-36.5,27.8c-3,2.2-6.3,3.3-10.1,1.1 c-28.6-16.5-52.9-37.3-67.2-67.9c-7.7-16.5-12-33.7-6-52c5.6-17.3,20.6-30,38-31.2c12.1-0.8,22.2,3.6,30,13.1 c3.4,4.1,6.4,8.4,9.8,13c2.7-4.2,4.9-8.3,7.7-11.9c2.7-3.4,6.2-6.2,10.2-10.2c5.4,15.7,11.9,29.6,22.1,41.1 C157.2,193.2,168.4,203.7,179.9,215.5z");
            gfav.appendChild(pathfav3);
            let pathfav4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathfav4.setAttribute("class", "favsheart");
            pathfav4.setAttribute("d", "M106,144.4c-6.2-8-14-14.2-24.2-17c-8.2-2.3-16.2-2.2-24.4,0c-1.9,0.5-5.2,0.2-6.2-1.1 C37,108,26.8,88.2,27.4,64.4c0.5-21.1,13.7-38.7,33-43.9c2.7-0.7,6.1-0.3,8.7,0.8c5.1,2,9.9,4.8,15.5,6.5c-2.2-2.3-4.4-4.7-6.8-7.2 c6.1-0.1,12.3,2.7,17.5,8.4c4.4,4.8,8.2,10.2,12.8,15.9c11.1-21.8,27.6-32,51.8-22.8c15,5.7,26.4,22.7,26.6,37.8 c-3.9-0.6-7.7-1.6-11.5-1.8c-25.5-0.7-48.2,19-52,45.5c-1.1,7.4-0.5,15.1-0.2,22.6c0.1,2.8-0.3,4.6-2.8,6.4 C115.1,135.9,110.9,140.1,106,144.4z");
            gfav.appendChild(pathfav4);
            let ellipsefav2 = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            ellipsefav2.setAttribute("class", "favsheart");
            ellipsefav2.setAttribute("cx", "172.2");
            ellipsefav2.setAttribute("cy", "85.5");
            ellipsefav2.setAttribute("rx", "23.7");
            ellipsefav2.setAttribute("ry", "15.8");
            gfav.appendChild(ellipsefav2);
            let h1 = document.createElement('h1');
            h1.setAttribute("class", "titlelist");
            h1.setAttribute("id", x[i]);
            h1.innerHTML = y[i] + " fav lists";
            div4.appendChild(h1);
        }

        var swiper2 = new Swiper('.sliderfav', {
            slidesPerView: 'auto',
            spaceBetween: 30,
            pagination: {
            el: '.swiper-pagination',
            clickable: true,
            },
        });
    }

let newTopList = [];
let newTopListStars = [];

// CREATE SLIDER TOP
    function crateSliderTop(x, y){
    // Filter top 10
                for(b = 0; b < y.length; b++){
                    newTopListStars.push(Math.max(...y));
                    let indexoflist = y.indexOf(Math.max(...y));
                    newTopList.push(x[indexoflist]);
                    x.splice(indexoflist, 1);
                    y.splice(indexoflist, 1);
                }  
        // create slider
        console.log(newTopList.slice(0,10));
        let getDiv = document.getElementById('sliderTop');
        getDiv.setAttribute("class", "swiper-container")
        let divcont = document.createElement('div');
        divcont.setAttribute("class", "swiper-wrapper");
        getDiv.appendChild(divcont);
        for (let i = 0; i < newTopList.slice(0,10).length; i++) {
            let div2 = document.createElement('div');
            div2.setAttribute("class", "swiper-slide");
            divcont.appendChild(div2);
            let div3 = document.createElement('div');
            div2.appendChild(div3);
            let imgbl = document.createElement('img');
                let gsReference = storage.refFromURL('gs://blessed-e4d26.appspot.com/'+ newTopList[i] +'.jpg');
                gsReference.getDownloadURL()
                    .then(function(url) {
                    imgbl.setAttribute("src", url);
                }).catch(function(error) {
                    console.log("Error: ", error);
                }); 
            imgbl.setAttribute("onclick", "modalseries(this)");
            imgbl.setAttribute("id", newTopList[i]);
            div3.appendChild(imgbl);
            let div4 = document.createElement('div');
            div4.setAttribute("class", "starcounta");
            div3.appendChild(div4);
            // create stars
                for ( let j=0; j<5; j++) {
                    let svgstar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svgstar.setAttribute("version", "1.1");
                    svgstar.setAttribute("class", "star");
                    svgstar.setAttribute("id", "star" + newTopList[i] + j + "t");
                    svgstar.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                    svgstar.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
                    svgstar.setAttribute("x", "0px");
                    svgstar.setAttribute("y", "0px");
                    svgstar.setAttribute("viewBox", "0 0 310 310");
                    svgstar.setAttribute("style", "enable-background:new 0 0 310 310;");
                    svgstar.setAttribute("xml:space", "preserve");
                    div4.appendChild(svgstar);
                    let defs = document.createElementNS("http://www.w3.org/2000/svg",'defs');
                    svgstar.appendChild(defs);
                    let grad = document.createElementNS("http://www.w3.org/2000/svg",'linearGradient');
                    grad.setAttribute("id", "left-half");
                    defs.appendChild(grad);
                    for ( let l = 0; l < 4; l++) {
                    let stop = document.createElementNS("http://www.w3.org/2000/svg",'stop');
                    stop.setAttribute("stop-opacity", "1");
                    if (l === 0) {
                        stop.setAttribute("offset", "0");
                        stop.setAttribute("stop-color", "rgb(228, 119, 125)");
                    } if (l === 1) {
                        stop.setAttribute("offset", "0.5");
                        stop.setAttribute("stop-color", "rgb(228, 119, 125)");
                    } if (l === 2) {
                        stop.setAttribute("offset", "0.5");
                        stop.setAttribute("stop-color", "transparent");
                    } if (l === 3) {
                        stop.setAttribute("offset", "1");
                        stop.setAttribute("stop-color", "transparent");
                    }
                    grad.appendChild(stop);
                    }
                    let grad2 = document.createElementNS("http://www.w3.org/2000/svg",'linearGradient');
                    grad2.setAttribute("id", "left-right-stroke");
                    defs.appendChild(grad2);
                    for ( let k = 0; k < 4; k++) {
                        let stop2 = document.createElementNS("http://www.w3.org/2000/svg",'stop');
                        stop2.setAttribute("stop-opacity", "1");
                        if (k === 0) {
                            stop2.setAttribute("offset", "0");
                            stop2.setAttribute("stop-color", "rgb(228, 119, 125)");
                        } if (k === 1) {
                            stop2.setAttribute("offset", "0.5");
                            stop2.setAttribute("stop-color", "rgb(228, 119, 125)");
                        } if (k === 2) {
                            stop2.setAttribute("offset", "0.5");
                            stop2.setAttribute("stop-color", "rgb(41, 70, 135)");
                        } if (k === 3) {
                            stop2.setAttribute("offset", "1");
                            stop2.setAttribute("stop-color", "rgb(41, 70, 135)");
                        }
                        grad2.appendChild(stop2);
                        }
                    let polygon = document.createElementNS("http://www.w3.org/2000/svg",'polygon');
                    polygon.setAttribute("class", "st0");
                    polygon.setAttribute("points", "155,26.4 196.8,111.1 290.2,124.6 222.6,190.6 238.6,283.6 155,239.7 71.4,283.6 87.4,190.6     19.8,124.6 113.2,111.1 ");
                    svgstar.appendChild(polygon);
                }
                    let halfNewTop = newTopListStars[i] / 2 ;
                    let indexNewTop = newTopList[i];
                    for (let i = 0; i < Math.floor(halfNewTop); i++) {
                        document.getElementById("star" + indexNewTop + i + "t").setAttribute("class", "star filled");
                    }
                    if (Number.isInteger(halfNewTop) === false) {
                        let fixedx = halfNewTop.toFixed(2);
                        if (fixedx-Math.floor(halfNewTop) >= 0.25 && fixedx-Math.floor(halfNewTop) <= 0.85) {
                        document.getElementById("star" + indexNewTop + (Math.floor(halfNewTop)) + "t").setAttribute("class", "star half");
                        }
                        else if (fixedx-Math.floor(halfNewTop) > 0.85) {
                            document.getElementById("star" + indexNewTop + (Math.floor(halfNewTop)) + "t").setAttribute("class", "star filled");
                            }
                    }
        }
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 30,
            pagination: {
            el: '.swiper-pagination',
            clickable: true,
            },
        });
    }

//create modal series 
    function modalseries(x) {
        let nameidthis = x.id;
        console.log(nameidthis);
        let modaldiv = document.getElementById("contmodal");
        document.getElementById("modalseriew").style.display= "block";
        document.getElementById("closemodal").setAttribute("onclick", "closemodalserie('"+nameidthis+"')");   
            // create series card
            let divcont = document.createElement('div');
            divcont.setAttribute("id", nameidthis);
            divcont.setAttribute("class", "favouriteimg flex");
            modaldiv.appendChild(divcont);
            let div1 = document.createElement('div');
            divcont.appendChild(div1);
        // series photo
            let img = document.createElement('img');
            let gsReference = storage.refFromURL('gs://blessed-e4d26.appspot.com/'+nameidthis+'.jpg');
                gsReference.getDownloadURL()
                    .then(function(url) {
                    img.setAttribute("src", url);
                }).catch(function(error) {
                    console.log("Error: ", error);
                }); 
            img.setAttribute("alt", nameidthis);
            img.setAttribute("class", "imgfavs");
            div1.appendChild(img);
        // get data 
            let docdb = db.collection("listOfBLs").where('__name__',"==",nameidthis);
            docdb.get()
            .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
        // create stars
            let divstars = document.createElement('div');
            divstars.setAttribute("class", "starcount");
            div1.appendChild(divstars);
            // create stars
                for ( let i=0; i<5; i++) {
                    let svgstar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svgstar.setAttribute("version", "1.1");
                    svgstar.setAttribute("class", "star modalstar");
                    svgstar.setAttribute("id", "star" + nameidthis + i);
                    svgstar.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                    svgstar.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
                    svgstar.setAttribute("x", "0px");
                    svgstar.setAttribute("y", "0px");
                    svgstar.setAttribute("viewBox", "0 0 310 310");
                    svgstar.setAttribute("style", "enable-background:new 0 0 310 310;");
                    svgstar.setAttribute("xml:space", "preserve");
                    divstars.appendChild(svgstar);
                    let defs = document.createElementNS("http://www.w3.org/2000/svg",'defs');
                    svgstar.appendChild(defs);
                    let grad = document.createElementNS("http://www.w3.org/2000/svg",'linearGradient');
                    grad.setAttribute("id", "left-half");
                    defs.appendChild(grad);
                    for ( let j = 0; j < 4; j++) {
                    let stop = document.createElementNS("http://www.w3.org/2000/svg",'stop');
                    stop.setAttribute("stop-opacity", "1");
                    if (j === 0) {
                        stop.setAttribute("offset", "0");
                        stop.setAttribute("stop-color", "rgb(228, 119, 125)");
                    } if (j === 1) {
                        stop.setAttribute("offset", "0.5");
                        stop.setAttribute("stop-color", "rgb(228, 119, 125)");
                    } if (j === 2) {
                        stop.setAttribute("offset", "0.5");
                        stop.setAttribute("stop-color", "transparent");
                    } if (j === 3) {
                        stop.setAttribute("offset", "1");
                        stop.setAttribute("stop-color", "transparent");
                    }
                    grad.appendChild(stop);
                    }
                    let grad2 = document.createElementNS("http://www.w3.org/2000/svg",'linearGradient');
                    grad2.setAttribute("id", "left-right-stroke");
                    defs.appendChild(grad2);
                    for ( let k = 0; k < 4; k++) {
                        let stop2 = document.createElementNS("http://www.w3.org/2000/svg",'stop');
                        stop2.setAttribute("stop-opacity", "1");
                        if (k === 0) {
                            stop2.setAttribute("offset", "0");
                            stop2.setAttribute("stop-color", "rgb(228, 119, 125)");
                        } if (k === 1) {
                            stop2.setAttribute("offset", "0.5");
                            stop2.setAttribute("stop-color", "rgb(228, 119, 125)");
                        } if (k === 2) {
                            stop2.setAttribute("offset", "0.5");
                            stop2.setAttribute("stop-color", "rgb(41, 70, 135)");
                        } if (k === 3) {
                            stop2.setAttribute("offset", "1");
                            stop2.setAttribute("stop-color", "rgb(41, 70, 135)");
                        }
                        grad2.appendChild(stop2);
                        }
                    let polygon = document.createElementNS("http://www.w3.org/2000/svg",'polygon');
                    polygon.setAttribute("class", "st0");
                    polygon.setAttribute("points", "155,26.4 196.8,111.1 290.2,124.6 222.6,190.6 238.6,283.6 155,239.7 71.4,283.6 87.4,190.6     19.8,124.6 113.2,111.1 ");
                    svgstar.appendChild(polygon);
                }
                let stars = doc.data().stars;
                let starsav = 0;
                starAverage(stars, starsav, nameidthis);
        // series name, country, year, description
            let div2 = document.createElement('div');
            div2.setAttribute("class", "seriesdata");
            divcont.appendChild(div2);
            let h2 = document.createElement('h2');
            h2.setAttribute("class", "nameserie");
            h2.setAttribute("id", nameidthis +"h2");
            h2.innerHTML = doc.data().name;
            div2.appendChild(h2);
            // category
            let h4 = document.createElement('h4');
            h4.setAttribute("id", "categoryfull");
            let fullbl = "Side story"
            if (doc.data().full === "yes") {
            h4.innerHTML = doc.data().category[0].toUpperCase() + doc.data().category.slice(1);
            } else {
            h4.innerHTML = doc.data().category[0].toUpperCase() + doc.data().category.slice(1) + " - " + fullbl;
            }
            div2.appendChild(h4);
            let h3 = document.createElement('h3');
            h3.setAttribute("class", "countryserie");
            h3.innerHTML = doc.data().country + " - " + doc.data().year;
            div2.appendChild(h3);
            let pseries = document.createElement('p');
            pseries.innerHTML = doc.data().description;
            div2.appendChild(pseries);  
        // button link watch
            let divflex = document.createElement('div');
            divflex.setAttribute("class", "flex");
            divflex.setAttribute("id", "aligndiv");
            div2.appendChild(divflex);
            let linkseries = document.createElement('a');
            linkseries.setAttribute("target", "_blank");
            divflex.appendChild(linkseries);
            let buttonwatch = document.createElement('div');
            buttonwatch.innerHTML = "watch";
            linkseries.appendChild(buttonwatch);
        // check if link
            if (doc.data().link === "") {
                buttonwatch.setAttribute("class", "watchlink nolink");
                linkseries.setAttribute("href", "");
            }
            else {
                buttonwatch.setAttribute("class", "watchlink");
                linkseries.setAttribute("href", doc.data().link);
            }
        // button watched
            let svgcheck = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgcheck.setAttribute("version", "1.1");
            svgcheck.setAttribute("id", "svgwatchedicon");
            svgcheck.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svgcheck.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            svgcheck.setAttribute("x", "0px");
            svgcheck.setAttribute("y", "0px");
            svgcheck.setAttribute("viewBox", "0 0 500 500");
            svgcheck.setAttribute("style", "enable-background:new 0 0 500 500;");
            svgcheck.setAttribute("xml:space", "preserve");
            divflex.appendChild(svgcheck);
            let pathcheck = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathcheck.setAttribute("class", "watchedicon2");
            pathcheck.setAttribute("d", "M381.5,488.2H120c-58.6,0-106.5-47.9-106.5-106.5V120.2C13.5,61.6,61.5,13.7,120,13.7h261.5 c58.6,0,106.5,47.9,106.5,106.5v261.5C488,440.3,440.1,488.2,381.5,488.2z");
            svgcheck.appendChild(pathcheck);
            let polycheck = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            polycheck.setAttribute("class", "watchedicon");
            polycheck.setAttribute("points", "165.5,256.7 216.2,335.3 365.4,144.8");
            svgcheck.appendChild(polycheck);
        // button watchlist
            let svgwlist = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgwlist.setAttribute("version", "1.1");
            svgwlist.setAttribute("id", "svgeyewatch");
            svgwlist.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svgwlist.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            svgwlist.setAttribute("x", "0px");
            svgwlist.setAttribute("y", "0px");
            svgwlist.setAttribute("viewBox", "0 0 500 500");
            svgwlist.setAttribute("style", "enable-background:new 0 0 500 500;");
            svgwlist.setAttribute("xml:space", "preserve");
            svgwlist.setAttribute("onclick", "watchList('"+nameidthis+"')");
            divflex.appendChild(svgwlist);
            let g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svgwlist.appendChild(g1);
            let g2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g1.appendChild(g2);
            let patheye1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            patheye1.setAttribute("id", "eyewatch");
            patheye1.setAttribute("d", "M9.1,247.7c0,0,227.9-420.1,484.1,0");
            g2.appendChild(patheye1);
            let patheye2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            patheye2.setAttribute("id", "eyewatch1");
            patheye2.setAttribute("d", "M9.1,237.7c0,0,227.9,420.1,484.1,0");
            g2.appendChild(patheye2);
            let circleeye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            //circleeye.setAttribute("class", "eyewatch eye");
            circleeye.setAttribute("id", "eyewatch2");
            circleeye.setAttribute("cx", "253.9");
            circleeye.setAttribute("cy", "245");
            circleeye.setAttribute("r", "76.8");
            g2.appendChild(circleeye);
            let g3 = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g1.appendChild(g3);
            let lineeye1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            lineeye1.setAttribute("class", "ewatch");
            lineeye1.setAttribute("x1", "253.7");
            lineeye1.setAttribute("y1", "197");
            lineeye1.setAttribute("x2", "253.3");
            lineeye1.setAttribute("y2", "250.7");
            g3.appendChild(lineeye1);
            let lineeye2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            lineeye2.setAttribute("class", "ewatch");
            lineeye2.setAttribute("x1", "253.7");
            lineeye2.setAttribute("y1", "246.5");
            lineeye2.setAttribute("x2", "291.4");
            lineeye2.setAttribute("y2", "284.7");
            g3.appendChild(lineeye2);
        // button heart
            let svgwheart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgwheart.setAttribute("version", "1.1");
            svgwheart.setAttribute("id", "svgheart"+nameidthis);
            svgwheart.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svgwheart.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            svgwheart.setAttribute("x", "0px");
            svgwheart.setAttribute("y", "0px");
            svgwheart.setAttribute("viewBox", "0 0 500 500");
            svgwheart.setAttribute("style", "enable-background:new 0 0 500 500;");
            svgwheart.setAttribute("xml:space", "preserve");
            svgwheart.setAttribute("class", "svgheart");
            svgwheart.setAttribute("onclick", "updateFav(" + nameidthis + ")");
            divflex.appendChild(svgwheart);
            let patheart = document.createElementNS("http://www.w3.org/2000/svg", "path");
            patheart.setAttribute("class", "heart");
            patheart.setAttribute("d", "M130.6,25.4c11.9,0,25.7-2.2,37.1,1.6c12,4,23.9,6.7,35,13C223.5,51.7,237.5,71,251,90.2 c10-18.6,24-35.5,41.9-46.9c9.5-6,19.8-10.3,30.5-13.6c11.8-3.6,22.1-4.3,34.4-4.3c44.8,0,88.1,28.8,109.4,67.5 c11.2,20.3,18.4,43.8,21,66.8c2.7,23.2-2.2,49.3-8.4,71.7c-12.4,44.7-37.7,86-66.7,121.9c-30,37.2-66.2,69.2-105.9,95.7 c-10.5,7-21.2,13.8-32,20.4c-9.7,5.9-20,12-31.7,8.5c-9.9-2.9-19.3-9.6-28.1-14.8c-9.1-5.4-18-11.1-26.7-17.1 C118.7,398.2,55.7,331,27.5,249.7c-7.6-21.8-13.7-44.4-14.5-67.4c-0.8-23.6,2.8-47.3,11.4-69.5c14.3-37.3,44.7-67.9,82.9-80.5 c5.4-1.8,11-3.3,16.5-4.9c1.9-0.5,8-3.6,9.9-1.8c-0.1-0.1-5.8,2.5-6.4,1.2C127,26.4,130.7,25.3,130.6,25.4 C137.5,25.4,119.1,29,130.6,25.4z");
            svgwheart.appendChild(patheart);
            let usermail = sessionStorage.getItem("useremail");
        // check if watched
                        db.collection('users').doc(usermail).collection('watched').where('__name__',"==",nameidthis).get().then((query) => {  
                            const thing = query.docs[0];
                            console.log(thing);
                            if (thing !== undefined) {
                                svgcheck.setAttribute("class", "svgwatchedicon svgchecked");
                                svgcheck.setAttribute("onclick", "deleteWatched('" + doc.data().name + "', '" + nameidthis + "')");
                                svgwlist.style.display= "none";
                                svgwheart.style.display= "flex";
                                // check if fav
                                if (thing.data().fav == "yes") {
                                    svgwheart.setAttribute("class", "svgheart favsvg");
                                    svgwheart.setAttribute("onclick", "deleteFav('" + doc.data().name + "', '" + nameidthis + "')");
                                } else {
                                    svgwheart.setAttribute("class", "svgheart");
                                    svgwheart.setAttribute("onclick", "addFav('" + doc.data().name + "', '" + nameidthis + "')");
                                }
                            } else {
                                svgcheck.setAttribute("onclick", "rateBL('" + doc.data().name + "', '" + nameidthis + "')");
                                svgcheck.setAttribute("class", "svgwatchedicon");
                                svgwlist.style.display= "flex";
                                svgwheart.style.display= "none";
                                // check if watchlist
                                db.collection('users').doc(usermail).collection('watchlist').where('__name__',"==",nameidthis).get().then((query) => {  
                                    const thing2 = query.docs[0];
                                    console.log(thing2);
                                    if (thing2 !== undefined) {
                                        patheye1.setAttribute("class", "eyewatch");
                                        patheye2.setAttribute("class", "eyewatch");
                                        circleeye.setAttribute("class", "eyewatch eye");
                                        svgwlist.setAttribute("onclick", "updatewatchList('" +nameidthis+ "')");
                                    } else {
                                        svgwlist.setAttribute("onclick", "watchList('" +nameidthis+ "')");
                                    }
                                })
                                .catch(function(error) {
                                    console.log("Error: " , error);
                                    });
                            }
                        })
                        .catch(function(error) {
                            console.log("Error: " , error);
                            });
                });
                })
                .catch(function(error) {
                console.log("Error: " , error);
                });
    }


// close modal series
    function closemodalserie(x) {
        let getparent = document.getElementById("contmodal");
        while (getparent.firstChild) {
            getparent.removeChild(getparent.firstChild);
        }
        document.getElementById("modalseriew").style.display= "none";
        document.getElementById("modalrate").style.display= "none";
    } 

// open modals index
    function openmodalsuggest() {
        document.getElementById("modalsuggest").style.display = "block";
    }

    function openmodaladd() {
        document.getElementById("modaladd").style.display = "block";
    }

// modal suggest a bl
// create list of suggestions 
    function createList(x, y) {
        let ul = document.createElement('ul');
        document.getElementById('canwatchthis').appendChild(ul);
        console.log(listofblsuggestion);
        if (x.length > 5){
            for (let i = 0; i < 5; i++) {
                randomn = Math.floor(Math.random()*(x.length));
                let li = document.createElement('li');
                ul.appendChild(li);
                li.innerHTML += y[randomn];
                li.setAttribute("class", "listsuggestion");
                li.setAttribute("id", x[randomn]);
                li.setAttribute("onclick", "modalseries(this)");
                x.splice(randomn, 1);
                y.splice(randomn, 1);
            }
        } else {
        x.forEach(function (value, item) {
            console.log(value);
            console.log(item);
            let li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML += y[item];
            li.setAttribute("class", "listsuggestion");
            li.setAttribute("id", value);
            li.setAttribute("onclick", "modalseries(this)");
            });
        }
    }

// suggest a bl
    let listofblsuggestion = [];
    let namelistofblsuggestion = [];

    function suggestabl() {
        let option = document.getElementsByClassName('radioinp');
            if (!(option[0].checked || option[1].checked || option[2].checked)) {
                alert("please complete all");
                return false;
            } else if (!(option[3].checked || option[4].checked || option[5].checked)) {
                alert("please complete all");
                return false;
            } else if (!(option[6].checked || option[7].checked)) {
                alert("please complete all");
                return false;
            } else if (!(option[8].checked || option[9].checked)) {
                alert("please complete all");
                return false;
            } else {
        let getelements = document.getElementById('formsuggest').elements;
        let category = getelements['long'].value;
        let age = getelements['age'].value;
        let full = getelements['story'].value;
        let tocry = getelements['cry'].value;
        let ifmovies = ["movie", "short film"];
                if (category === "movie") { 
                    searchBLsuggestions("in", ifmovies);
                } else {
                    searchBLsuggestions("==", category);
                }
                function searchBLsuggestions(x, y){
                let suggestionbl = db.collection("listOfBLs").where("category", x, y).where("age","==", age).where("full","==", full).where("tocry","==", tocry);
                    suggestionbl.get()
                    .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                    listofblsuggestion.push(doc.id);
                    namelistofblsuggestion.push(doc.data().name);
                    });
                    if (listofblsuggestion.length === 0) {
                        let suggestionbl2 = db.collection("listOfBLs").where("category", x, y).where("age","==", age).where("tocry","==", tocry);
                    suggestionbl2.get()
                    .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                    listofblsuggestion.push(doc.id);
                    namelistofblsuggestion.push(doc.data().name);
                    });
                        if (listofblsuggestion.length === 0) {
                            let suggestionbl3 = db.collection("listOfBLs").where("category", x, y).where("age","==", age);
                        suggestionbl3.get()
                        .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                        listofblsuggestion.push(doc.id);
                        namelistofblsuggestion.push(doc.data().name);
                        });
                        createList(listofblsuggestion, namelistofblsuggestion);
                        })
                        .catch(function(error) {
                        console.log("Error: " , error);
                        });
                        }
                            else{
                            createList(listofblsuggestion, namelistofblsuggestion);
                            }
                    })
                    .catch(function(error) {
                    console.log("Error: " , error);
                    });
                    }
                        else{
                        createList(listofblsuggestion, namelistofblsuggestion);
                        }
                    })
                    .catch(function(error) {
                    console.log("Error: " , error);
                    });
                }
        document.getElementById('formsuggest').style.display = "none";
        document.getElementById('suggestions').style.display = "block";
        }
    }
// close suggestions
    function closemodalsuggestion() {
        document.getElementById("modalsuggest").style.display= "none";
        document.getElementById('formsuggest').style.display = "block";
        document.getElementById('suggestions').style.display = "none";
        let element = document.getElementById("canwatchthis");
            while (element.firstChild) {
            element.removeChild(element.firstChild);
            }
        listofblsuggestion.length = 0;
        namelistofblsuggestion.length = 0;
    }

// add a bl
    function addnewbl() {
        document.getElementById("modaladd").style.display= "none";
        document.getElementById("thanksadd").style.display= "block";
        setTimeout(function(){ document.getElementById("thanksadd").style.display= "none"; }, 3000);

        let usermail = sessionStorage.getItem("useremail");
        let name = document.getElementById('blname').value;
        let year = document.getElementById('blyear').value;
        let country = document.getElementById('blcountry').value;
        let link = document.getElementById('bllink').value;
        let getelements = document.getElementById('formadd').elements;
        let category = getelements['bllong'].value;
        let newbldata = {
                name: name,
                country: country,
                year: year,
                category: category,
                link: link,
                };
            db.collection("addNewBls").doc(name+usermail).set(newbldata)
            .then(function(docRef) {
            console.log("OK!");
            })
            .catch(function(error) {
            console.log("Error: " + error);
            });
    }

// options page
    function openoptions(x) {
        sessionStorage.setItem('optionsliid', x.id);
    }

let shortlistid = [];
let shortlistname = [];
let movielistid = [];
let movielistname = [];
let minilistid = [];
let minilistname = [];
let serielistid = [];
let serielistname = [];
let tocrylistid = [];
let tocrylistname = [];

// get options
    function loadoptions() {
        let optionsid = sessionStorage.getItem('optionsliid');
        if (optionsid === 'shorti') {
            document.getElementById("shorti").style.color = "rgb(228, 119, 125)";
                let shorts = db.collection("listOfBLs").where("category","==","short film");
                shorts.get()
                .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                shortlistid.push(doc.id);
                shortlistname.push(doc.data().name);
                });
                loadListOptions(shortlistid,"contentoptions");
                document.getElementById('inputsearch').setAttribute("oninput", "searchHome('prueba', shortlistname, shortlistid, optionsmessage)")
                })
                .catch(function(error) {
                console.log("Error: " , error);
                })
                .finally(function() {hideGifLoading();});
        } else if (optionsid === 'moviei') {
            document.getElementById("moviei").style.color = "rgb(228, 119, 125)";
            let movies = db.collection("listOfBLs").where("category","==","movie");
                movies.get()
                .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                movielistid.push(doc.id);
                movielistname.push(doc.data().name);
                });
                loadListOptions(movielistid,"contentoptions");
                document.getElementById('inputsearch').setAttribute("oninput", "searchHome('prueba', movielistname, movielistid, optionsmessage)")
                })
                .catch(function(error) {
                console.log("Error: " , error);
                })
                .finally(function() {hideGifLoading();});
        } else if (optionsid === 'seriesi') {
            document.getElementById("seriesi").style.color = "rgb(228, 119, 125)";
            let series = db.collection("listOfBLs").where("category","==","series");
                series.get()
                .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    serielistid.push(doc.id);
                    serielistname.push(doc.data().name);
                });
                loadListOptions(serielistid,"contentoptions");
                document.getElementById('inputsearch').setAttribute("oninput", "searchHome('prueba', serielistname, serielistid, optionsmessage)")
                })
                .catch(function(error) {
                console.log("Error: " , error);
                })
                .finally(function() {hideGifLoading();});
        } else if (optionsid === 'miniseriesi') {
            document.getElementById("miniseriesi").style.color = "rgb(228, 119, 125)";
            let minis = db.collection("listOfBLs").where("category","==","mini");
                minis.get()
                .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    minilistid.push(doc.id);
                    minilistname.push(doc.data().name);
                });
                loadListOptions(minilistid,"contentoptions");
                document.getElementById('inputsearch').setAttribute("oninput", "searchHome('prueba', minilistname, minilistid, optionsmessage)")
                })
                .catch(function(error) {
                console.log("Error: " , error);
                })
                .finally(function() {hideGifLoading();});
        } else {
            document.getElementById("tocryi").style.color = "rgb(228, 119, 125)";
            let tocrys = db.collection("listOfBLs").where("tocry","==","yes");
                tocrys.get()
                .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    tocrylistid.push(doc.id);
                    tocrylistname.push(doc.data().name);
                });
                loadListOptions(tocrylistid,"contentoptions");
                document.getElementById('inputsearch').setAttribute("oninput", "searchHome('prueba', tocrylistname, tocrylistid, optionsmessage)")
                })
                .catch(function(error) {
                console.log("Error: " , error);
                })
                .finally(function() {hideGifLoading();});
        }
    }

// load options
  function loadListOptions(y,z) {
    let divoptions = document.getElementById(z);
    let ul = document.createElement('ul');
    ul.setAttribute("class", "ulflex");
    divoptions.appendChild(ul);
    for (let i = 0; i< y.length; i++) {
        let li = document.createElement('li');
        li.setAttribute("id", y[i]+"img");
        ul.appendChild(li);
        let img = document.createElement('img');
                let gsReference = storage.refFromURL('gs://blessed-e4d26.appspot.com/'+y[i]+'.jpg');
                gsReference.getDownloadURL()
                        .then(function(url) {
                        img.src = url;
                    }).catch(function(error) {
                        console.log("Error: ", error);
                    });      
        img.setAttribute("onclick", "modalseries(this)");
        img.setAttribute("id", y[i]);
        li.appendChild(img);
        }
    }

// watched page
    function loadlistofwatchedbls(x) {
        let divlistofwatched = document.getElementById("listofwatchedbls");
        let ul = document.createElement('ul');
        ul.setAttribute("class", "ulflex");
        divlistofwatched.appendChild(ul);
        x.forEach(function (item) {
            let li = document.createElement('li');
            ul.appendChild(li);
            let img = document.createElement('img');
            let gsReference = storage.refFromURL('gs://blessed-e4d26.appspot.com/'+item+'.jpg');
                gsReference.getDownloadURL()
                    .then(function(url) {
                    img.setAttribute("src", url);
                }).catch(function(error) {
                    console.log("Error: ", error);
                }); 
            img.setAttribute("alt", item);
            img.setAttribute("class", "imgfavs");
            img.setAttribute("onclick", "modalseries(this)");
            img.setAttribute("id", item);
            div1.appendChild(img);
            li.appendChild(img);
        });
    }

let watchedBList = [];
let watchedBListname = [];
// get watched list
    function getWatchedList() {
        let usermail = sessionStorage.getItem("useremail");
        db.collection('users').doc(usermail).collection('watched').get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            watchedBList.push(doc.id);
            });
            })
        .then(function(){
            console.log(watchedBList);
            loadListOptions(watchedBList,"listofwatchedbls");
            for (let i = 0; i < watchedBList.length; i++) {
                db.collection('listOfBLs').where('__name__', '==', watchedBList[i]).get()
                .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                watchedBListname.push(doc.data().name);
                });
                }).catch(function(error) {
                    console.error(error);
                }); 
                }
        }).catch(function(error) {
            console.error(error);
        });   
    }

let favBList = [];
let favBListname = [];
// get favs list
    function getFavList() {
        let usermail = sessionStorage.getItem("useremail");
        db.collection('users').doc(usermail).collection('watched').where('fav',"==","yes").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                favBList.push(doc.id);
            });
            })
        .then(function(){
            console.log(favBList);
            loadlistofseries(favBList,"contentfavs",favBListname);
        }).catch(function(error) {
            console.error(error);
        });   
    }

let watchListbl = [];
let watchListblname = [];
// get watchlist
    function getWatchList() {
        let usermail = sessionStorage.getItem("useremail");
        db.collection('users').doc(usermail).collection('watchlist').get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            watchListbl.push(doc.id);
            });
            })
        .then(function(){
            console.log(watchListbl);
            loadlistofseries(watchListbl,"listtowatch",watchListblname);
        }).catch(function(error) {
            console.error(error);
        });   
    }


// FUNCTION ON LOAD PAGE SHOW LIST OF SERIES
    function loadlistofseries(x, y, z) {
        let divwatchlist = document.getElementById(y);
        x.forEach(function (item) {
            // create series card
            let divcont = document.createElement('div');
            divcont.setAttribute("id", item+"div");
            divcont.setAttribute("class", "favouriteimg flex onload");
            divwatchlist.appendChild(divcont);
            let div1 = document.createElement('div');
            divcont.appendChild(div1);
        // series photo
            let img = document.createElement('img');
            let gsReference = storage.refFromURL('gs://blessed-e4d26.appspot.com/'+item+'.jpg');
                gsReference.getDownloadURL()
                    .then(function(url) {
                    img.setAttribute("src", url);
                }).catch(function(error) {
                    console.log("Error: ", error);
                }); 
            img.setAttribute("alt", item);
            img.setAttribute("class", "imgfavs");
            div1.appendChild(img);
        // get data 
            let docdb = db.collection("listOfBLs").where('__name__',"==",item);
            docdb.get()
            .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
        // create stars
            let divstars = document.createElement('div');
            divstars.setAttribute("class", "starcount");
            div1.appendChild(divstars);
            // create stars
                for ( let i=0; i<5; i++) {
                    let svgstar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svgstar.setAttribute("version", "1.1");
                    svgstar.setAttribute("class", "star modalstar");
                    svgstar.setAttribute("id", "star" + item + i);
                    svgstar.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                    svgstar.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
                    svgstar.setAttribute("x", "0px");
                    svgstar.setAttribute("y", "0px");
                    svgstar.setAttribute("viewBox", "0 0 310 310");
                    svgstar.setAttribute("style", "enable-background:new 0 0 310 310;");
                    svgstar.setAttribute("xml:space", "preserve");
                    divstars.appendChild(svgstar);
                    let defs = document.createElementNS("http://www.w3.org/2000/svg",'defs');
                    svgstar.appendChild(defs);
                    let grad = document.createElementNS("http://www.w3.org/2000/svg",'linearGradient');
                    grad.setAttribute("id", "left-half");
                    defs.appendChild(grad);
                    for ( let j = 0; j < 4; j++) {
                    let stop = document.createElementNS("http://www.w3.org/2000/svg",'stop');
                    stop.setAttribute("stop-opacity", "1");
                    if (j === 0) {
                        stop.setAttribute("offset", "0");
                        stop.setAttribute("stop-color", "rgb(228, 119, 125)");
                    } if (j === 1) {
                        stop.setAttribute("offset", "0.5");
                        stop.setAttribute("stop-color", "rgb(228, 119, 125)");
                    } if (j === 2) {
                        stop.setAttribute("offset", "0.5");
                        stop.setAttribute("stop-color", "transparent");
                    } if (j === 3) {
                        stop.setAttribute("offset", "1");
                        stop.setAttribute("stop-color", "transparent");
                    }
                    grad.appendChild(stop);
                    }
                    let grad2 = document.createElementNS("http://www.w3.org/2000/svg",'linearGradient');
                    grad2.setAttribute("id", "left-right-stroke");
                    defs.appendChild(grad2);
                    for ( let k = 0; k < 4; k++) {
                        let stop2 = document.createElementNS("http://www.w3.org/2000/svg",'stop');
                        stop2.setAttribute("stop-opacity", "1");
                        if (k === 0) {
                            stop2.setAttribute("offset", "0");
                            stop2.setAttribute("stop-color", "rgb(228, 119, 125)");
                        } if (k === 1) {
                            stop2.setAttribute("offset", "0.5");
                            stop2.setAttribute("stop-color", "rgb(228, 119, 125)");
                        } if (k === 2) {
                            stop2.setAttribute("offset", "0.5");
                            stop2.setAttribute("stop-color", "rgb(41, 70, 135)");
                        } if (k === 3) {
                            stop2.setAttribute("offset", "1");
                            stop2.setAttribute("stop-color", "rgb(41, 70, 135)");
                        }
                        grad2.appendChild(stop2);
                        }
                    let polygon = document.createElementNS("http://www.w3.org/2000/svg",'polygon');
                    polygon.setAttribute("class", "st0");
                    polygon.setAttribute("points", "155,26.4 196.8,111.1 290.2,124.6 222.6,190.6 238.6,283.6 155,239.7 71.4,283.6 87.4,190.6     19.8,124.6 113.2,111.1 ");
                    svgstar.appendChild(polygon);
                }
                let stars = doc.data().stars;
                let starsav = 0;
                starAverage(stars, starsav, item);
        // series name, country, year, description
            let div2 = document.createElement('div');
            div2.setAttribute("class", "seriesdata");
            divcont.appendChild(div2);
            let h2 = document.createElement('h2');
            h2.setAttribute("class", "nameserie");
            h2.setAttribute("id", item +"h2");
            h2.innerHTML = doc.data().name;
            div2.appendChild(h2);
            z.push(doc.data().name);
            // category
            let h4 = document.createElement('h4');
            h4.setAttribute("id", "categoryfull");
            let fullbl = "Side story"
            if (doc.data().full === "yes") {
            h4.innerHTML = doc.data().category[0].toUpperCase() + doc.data().category.slice(1);
            } else {
            h4.innerHTML = doc.data().category[0].toUpperCase() + doc.data().category.slice(1) + " - " + fullbl;
            }
            div2.appendChild(h4);
            let h3 = document.createElement('h3');
            h3.setAttribute("class", "countryserie");
            h3.innerHTML = doc.data().country + " - " + doc.data().year;
            div2.appendChild(h3);
            let pseries = document.createElement('p');
            pseries.innerHTML = doc.data().description;
            div2.appendChild(pseries);
        // button link watch
            let divflex = document.createElement('div');
            divflex.setAttribute("class", "flex");
            divflex.setAttribute("id", "aligndiv");
            div2.appendChild(divflex);
            let linkseries = document.createElement('a');
            divflex.appendChild(linkseries);
            let buttonwatch = document.createElement('div');
            buttonwatch.innerHTML = "watch";
            linkseries.appendChild(buttonwatch);
        // check if link
            if (doc.data().link === "") {
                buttonwatch.setAttribute("class", "watchlink nolink");
                linkseries.setAttribute("href", "");
            }
            else {
                buttonwatch.setAttribute("class", "watchlink");
                linkseries.setAttribute("href", doc.data().link);
            }
        // button watched
            let svgcheck = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgcheck.setAttribute("version", "1.1");
            svgcheck.setAttribute("id", "svgwatchedicon");
            svgcheck.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svgcheck.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            svgcheck.setAttribute("x", "0px");
            svgcheck.setAttribute("y", "0px");
            svgcheck.setAttribute("viewBox", "0 0 500 500");
            svgcheck.setAttribute("style", "enable-background:new 0 0 500 500;");
            svgcheck.setAttribute("xml:space", "preserve");
            divflex.appendChild(svgcheck);
            let pathcheck = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathcheck.setAttribute("class", "watchedicon2");
            pathcheck.setAttribute("d", "M381.5,488.2H120c-58.6,0-106.5-47.9-106.5-106.5V120.2C13.5,61.6,61.5,13.7,120,13.7h261.5 c58.6,0,106.5,47.9,106.5,106.5v261.5C488,440.3,440.1,488.2,381.5,488.2z");
            svgcheck.appendChild(pathcheck);
            let polycheck = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            polycheck.setAttribute("class", "watchedicon");
            polycheck.setAttribute("points", "165.5,256.7 216.2,335.3 365.4,144.8");
            svgcheck.appendChild(polycheck);
        // button watchlist
            let svgwlist = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgwlist.setAttribute("version", "1.1");
            svgwlist.setAttribute("id", "svgeyewatch");
            svgwlist.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svgwlist.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            svgwlist.setAttribute("x", "0px");
            svgwlist.setAttribute("y", "0px");
            svgwlist.setAttribute("viewBox", "0 0 500 500");
            svgwlist.setAttribute("style", "enable-background:new 0 0 500 500;");
            svgwlist.setAttribute("xml:space", "preserve");
            divflex.appendChild(svgwlist);
            let g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svgwlist.appendChild(g1);
            let g2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g1.appendChild(g2);
            let patheye1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            patheye1.setAttribute("id", "eyewatch");
            patheye1.setAttribute("d", "M9.1,247.7c0,0,227.9-420.1,484.1,0");
            g2.appendChild(patheye1);
            let patheye2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            patheye2.setAttribute("id", "eyewatch1");
            patheye2.setAttribute("d", "M9.1,237.7c0,0,227.9,420.1,484.1,0");
            g2.appendChild(patheye2);
            let circleeye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circleeye.setAttribute("id", "eyewatch2");
            circleeye.setAttribute("cx", "253.9");
            circleeye.setAttribute("cy", "245");
            circleeye.setAttribute("r", "76.8");
            g2.appendChild(circleeye);
            let g3 = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g1.appendChild(g3);
            let lineeye1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            lineeye1.setAttribute("class", "ewatch");
            lineeye1.setAttribute("x1", "253.7");
            lineeye1.setAttribute("y1", "197");
            lineeye1.setAttribute("x2", "253.3");
            lineeye1.setAttribute("y2", "250.7");
            g3.appendChild(lineeye1);
            let lineeye2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            lineeye2.setAttribute("class", "ewatch");
            lineeye2.setAttribute("x1", "253.7");
            lineeye2.setAttribute("y1", "246.5");
            lineeye2.setAttribute("x2", "291.4");
            lineeye2.setAttribute("y2", "284.7");
            g3.appendChild(lineeye2);
        // button heart
            let svgwheart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgwheart.setAttribute("version", "1.1");
            svgwheart.setAttribute("id", "svgheart"+item);
            svgwheart.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svgwheart.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            svgwheart.setAttribute("x", "0px");
            svgwheart.setAttribute("y", "0px");
            svgwheart.setAttribute("viewBox", "0 0 500 500");
            svgwheart.setAttribute("style", "enable-background:new 0 0 500 500;");
            svgwheart.setAttribute("xml:space", "preserve");
            svgwheart.setAttribute("onclick", "updateFav(" + item + ")");
            divflex.appendChild(svgwheart);
            let patheart = document.createElementNS("http://www.w3.org/2000/svg", "path");
            patheart.setAttribute("class", "heart");
            patheart.setAttribute("d", "M130.6,25.4c11.9,0,25.7-2.2,37.1,1.6c12,4,23.9,6.7,35,13C223.5,51.7,237.5,71,251,90.2 c10-18.6,24-35.5,41.9-46.9c9.5-6,19.8-10.3,30.5-13.6c11.8-3.6,22.1-4.3,34.4-4.3c44.8,0,88.1,28.8,109.4,67.5 c11.2,20.3,18.4,43.8,21,66.8c2.7,23.2-2.2,49.3-8.4,71.7c-12.4,44.7-37.7,86-66.7,121.9c-30,37.2-66.2,69.2-105.9,95.7 c-10.5,7-21.2,13.8-32,20.4c-9.7,5.9-20,12-31.7,8.5c-9.9-2.9-19.3-9.6-28.1-14.8c-9.1-5.4-18-11.1-26.7-17.1 C118.7,398.2,55.7,331,27.5,249.7c-7.6-21.8-13.7-44.4-14.5-67.4c-0.8-23.6,2.8-47.3,11.4-69.5c14.3-37.3,44.7-67.9,82.9-80.5 c5.4-1.8,11-3.3,16.5-4.9c1.9-0.5,8-3.6,9.9-1.8c-0.1-0.1-5.8,2.5-6.4,1.2C127,26.4,130.7,25.3,130.6,25.4 C137.5,25.4,119.1,29,130.6,25.4z");
            svgwheart.appendChild(patheart);
            let usermail = sessionStorage.getItem("useremail");
        // check if watched
                        db.collection('users').doc(usermail).collection('watched').where('__name__',"==",item).get().then((query) => {  
                            const thing = query.docs[0];
                            console.log(thing);
                            if (thing !== undefined) {
                                svgcheck.setAttribute("class", "svgwatchedicon svgchecked");
                                svgcheck.setAttribute("onclick", "deleteWatched('" + doc.data().name + "', '" + item + "')");
                                svgwlist.style.display= "none";
                                svgwheart.style.display= "flex";
                                // check if fav
                                if (thing.data().fav == "yes") {
                                    svgwheart.setAttribute("class", "svgheart favsvg");
                                    svgwheart.setAttribute("onclick", "deleteFav('" + doc.data().name + "', '" + item + "')");
                                } else {
                                    svgwheart.setAttribute("class", "svgheart");
                                    svgwheart.setAttribute("onclick", "addFav('" + doc.data().name + "', '" + item + "')");
                                }
                            } else {
                                svgcheck.setAttribute("onclick", "rateBL('" + doc.data().name + "', '" + item + "')");
                                svgcheck.setAttribute("class", "svgwatchedicon");
                                svgwlist.style.display= "flex";
                                svgwheart.style.display= "none";
                                // check if watchlist
                                db.collection('users').doc(usermail).collection('watchlist').where('__name__',"==",item).get().then((query) => {  
                                    const thing2 = query.docs[0];
                                    console.log(thing2);
                                    if (thing2 !== undefined) {
                                        patheye1.setAttribute("class", "eyewatch");
                                        patheye2.setAttribute("class", "eyewatch");
                                        circleeye.setAttribute("class", "eyewatch eye");
                                        svgwlist.setAttribute("onclick", "updatewatchList('" +item+ "')");
                                    } else {
                                        svgwlist.setAttribute("onclick", "watchList('" +item+ "')");
                                    }
                                })
                                .catch(function(error) {
                                    console.log("Error: " , error);
                                    });
                            }
                        })
                        .catch(function(error) {
                            console.log("Error: " , error);
                            });
                });
                })
                .catch(function(error) {
                console.log("Error: " , error);
                });
        });
    }