//const express = require('express')
const request = require('request')
const baseURL = 'monuments'

module.exports = {
    postPaymentStatus : function(req,res) {
        res.redirect(`https://secure.yatra.com/${baseURL}/confirmation?ttid=`+req.query.ttid)
    },
    getPaymentStatus : function(req,res) {
       res.redirect(`https://www.yatra.com/${baseURL}/home`)
    },
    setWhtsappAPI: function (req, res) {
        //console.log(req.body)
        request.post({
            url: `http://service1.yatra.com/user-profile-service/services/user-profile-service/user/profile/additionalInfo/v2`,
            headers: {
                    'com.yatra.tenant.header.tenantId': 5406,
                    'Content-type': 'application/json'
            },
            json:req.body
        }, function (error, response, body) {
            if (error) {
                res.status(200).json({ error: error });
            }
            else {
                res.send(response.body)
            }
        })
    }
    // },
    // checkWhtsappAPI: function (req, res) {
    //     //console.log(req.body)
    //     var list = {};
    //     rc = req.headers.cookie;
    //     rc && rc.split(';').forEach(function( cookie ) {
    //         var parts = cookie.split('=');
    //         list[parts.shift().trim()] = decodeURI(parts.join('='));
    //     });
    //     request.post({
    //         url: `http://service1.yatra.com/user-aggregator-service/services/user-aggregator-service/user/info`,
    //         headers: {
    //                 'com.yatra.tenant.header.tenantId': 5406,
    //                 'Content-type': 'application/json'
    //         },
    //         json:{
    //             "ssoToken": list.ssoToken ? list.ssoToken : ''
    //         }
    //     }, function (error, response, body) {
    //         if (error) {
    //             res.status(200).json({ error: error });
    //         }
    //         else {
    //             res.send(response.body)
    //         }
    //     })
    // }
}