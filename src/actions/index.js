import alt from '../alt';
import Firebase from 'firebase';
import _ from 'lodash';

class Actions {

  initSession() {
    return (dispatch) => {
      var firebaseRef = new Firebase('https://product-hunt.firebaseio.com');
      var authData = firebaseRef.getAuth();
      var user;

      if(authData) {
        user = {
          id: authData.facebook.id,
          name: authData.facebook.displayName,
          avatar: authData.facebook.profileImageURL
        }
      } else {
        user = null;
      }
      setTimeout(() => dispatch(user));
    }
  }

  login() {
    return (dispatch) => {
      var firebaseRef = new Firebase('https://product-hunt.firebaseio.com');
      firebaseRef.authWithOAuthPopup('facebook', (error, authData) => {
        if (error) {
          console.log("authWithOAuthPopup error")
          return;
        }

        var user = {
          id: authData.facebook.id,
          name: authData.facebook.displayName,
          avatar: authData.facebook.profileImageURL
        }
        firebaseRef.child("users").child(authData.facebook.id).set(user);
        dispatch(user);
      });
    }
  }

  logout() {
    return(dispatch) => {
      var firebaseRef = new Firebase('https://product-hunt.firebaseio.com');
      firebaseRef.unauth();
      setTimeout(() => dispatch(null));
    }
  }

  getProducts() {
    return(dispatch) => {
      var firebaseRef = new Firebase('https://product-hunt.firebaseio.com/products');
      firebaseRef.on('value', (snapshop) => {
        var productsValue = snapshop.val();
        console.log('productsValue');
        console.log(productsValue.map( (a) => a) );
        var products = _(productsValue).keys().map((productKey) => {
          var item = _.clone(productsValue[productKey]);
          console.log('item');console.log( item);
          item.key = productKey;
          return item;
        })
        .value();
        dispatch(products);
      });
    }
  }

    addProduct(product) {
      return (dispatch) => {
      var firebaseRef = new Firebase('https://product-hunt.firebaseio.com/products');
      firebaseRef.push(product)
      }
    }

    addVote(productId, userId) {
      console.log('addVote')
      return (dispatch) => {
      var firebaseRef = new Firebase('https://product-hunt.firebaseio.com');
      console.log('productId')
      console.log(productId)

      firebaseRef=firebaseRef.child('products').child(productId).child('upvote')

      var vote=0;
      firebaseRef.on('value', (snapshop) => {
      // console.log('snapshop');console.log(snapshop.val())
      console.log('firebaseRef:');console.log(snapshop.val() )

        // var products = _.compact(_.values( snapshop.val() ) );
        vote=snapshop.val();
      });
      firebaseRef.set(vote+1);

      }
    }


        // var productsValue =  snapshot.val().filter( (a) => a );
        // var products = _(productsValue).keys().map((productKey) =>{
        //   var item =_.clone(productsValue[productKey]);
        //   return item;
        // }).value();
        // dispatch(products);





}

export default alt.createActions(Actions);
