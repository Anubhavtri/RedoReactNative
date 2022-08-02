
import APIKit from '../app/APIKit.js';
export const POSTApi = async (url, object,token) => {
  console.log("url"+url)
  console.log("token"+token)
  console.log("object"+ JSON.stringify(object))
  return APIKit.post(url,object,{
    headers : {
       'Authorization' :"Token "+token,
      "Content-Type":"application/json"
    } 
    }).then(function (response) {
      console.log("response : " + JSON.stringify(response.data))
    if (response.data.id !=undefined) {
      return { error : false,  message: "success", data: response.data }
    } else {
      return { error : true, message: resMeta.msg, data: '' }
    }
  })
  .catch(function (error) {
    console.log("error" + JSON.stringify(error))
    if(error.response == undefined){
      return { error : true, message: "Something went wrong with api", data: '' }
    }else if(error.response.status == 440 || error.response.status == 401){
      return { error : true, message: "Session expire, Please login again", data: '' }
     }else {
      return { error : true, message: "Something went wrong with api", data: '' }
     }
  });
}
export const PATCHApi = async (url, object,token) => {
  console.log("url"+url)
  console.log("token"+token)
  console.log("object"+ JSON.stringify(object))
  return APIKit.patch(url,object,{
    headers : {
       'Authorization' :"Token "+token,
      "Content-Type":"application/json"
    } 
    }).then(function (response) {
      return { error : false,  message: "Updated Successfully", data:''}
  })
  .catch(function (error) {
    console.log("error" + JSON.stringify(error))
    if(error.response == undefined){
      return { error : true, message: "Something went wrong with api", data: '' }
    }else if(error.response.status == 440 || error.response.status == 401){
      return { error : true, message: "Session expire, Please login again", data: '' }
     }else {
      return { error : true, message: "Something went wrong with api", data: '' }
     }
  });
}

export const DELETEApi = async (url, object ,token) => {
  console.log("object"+ JSON.stringify(object))
  console.log("token"+ token)
  return APIKit.delete(url,object,{
    headers : {
       'Authorization' :"Token "+token,
      "Content-Type":"application/json"
    }}).then(function (response) {
    return { error : false,  message: "Updated Successfully", data:''}
})
  .catch(function (error) {
    console.log("error"+ JSON.stringify(error))
    if(error.response == undefined){
      return { error : true, message: "Something went wrong with api", data: '' }
    }else if(error.response.status == 440 || error.response.status == 401){
        return { error : true, message: "Session expire, Please login again", data: '' }
     }else {
      return { error : true, message: "Something went wrong with api", data: '' }
     }
  });
}
export const GETApi = async (url,token) => {
  console.log("url"+ url)
  console.log("token"+ token)
  return APIKit.get(url,{
    headers : {
       'Authorization' :"Token "+token,
    } }).then(function (response) {
    var resMeta = response.data
    console.log( "response"+ JSON.stringify(resMeta))
      return { error : false,message: "Data Found",data: response.data }
  })
  .catch(function (error) {
    console.log("error" + error.response)
    if(error.response == undefined){
      return { error : true, message: "Something went wrong with api", data: '' }
    }else if(error.response.status == 440 || error.response.status == 401){
       return { error : true, message: "Session expire, Please login again", data: '' }
     }else {
      return { error : true, message: "Something went wrong with api", data: '' }
     }
  });
}



export const PUTApi = async (url, object ,token) => {
  console.log("object"+ JSON.stringify(object))
  console.log("token"+ token)
  return APIKit.put(url,object,{
    headers : {
       'Authorization' :"Token "+token,
      "Content-Type":"application/json"
    }}).then(function (response) {
      console.log("response :"+JSON.stringify(response.data))
    return { error : false,  message: "Updated Successfully", data: response.data}
})
  .catch(function (error) {
    console.log("error"+ JSON.stringify(error))
    console.log("error" + error.response)
    if(error.response == undefined){
      return { error : true, message: "Something went wrong with api", data: '' }
    }else if(error.response.status == 440 || error.response.status == 401){
        return { error : true, message: "Session expire, Please login again", data: '' }
     }else {
      return { error : true, message: "Something went wrong with api", data: '' }
     }
  });
}
