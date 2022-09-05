const router = require("express").Router();
const Holder = require("../models/Holder");
const passwordCheck = require("../utils/passwordCheck");
const verifyToken = require("../utils/VerifyToken");

/*
    @ dev : IPFS VC 저장
    @ desc : Holder가 발급받은 VC를 IPFS에 저장합니다.
        - Isser로 부터 VC를 전달받습니다.
        - VC는 사용자의 비밀번호를 대칭키로 암호화 합니다.
        - 암호화 된 VC를 IPFS 저장 후 해시값을 받아옵니다.
    @ subject : Holder
*/
router.post("/save-vc-ipfs", verifyToken,  passwordCheck, );

/*
    @ dev : Get VC From IPFS
    @ desc : IPFS에 저장된 VC를 읽어옵니다.
        - IPFS는 사용자의 대칭키로 암호화 되어 있습니다.
        - 비밀번호를 요청해야 합니다. 
    @ subject : Holder
*/
router.post("/save-vc-ipfs", verifyToken,  passwordCheck, );

/*
    @ dev : Request VC Publish FROM Holder to Issuer
    @ desc : Issuer에게 VC 발급을 요청합니다.
        - params로 issuer의 ID를 특정합니다. 
    @ subject : Holder
*/
router.post('/request-vc:issuerId', verifyToken, )

/*
    @ dev : Authentication Request From Holder to Verifer
    @ desc : Verifier에게 인증을 요청합니다.
        - params로 인증받고자 하는 verifier를 특정합니다.
    @ subject : Holder
*/
router.post('/request-auth:verifierId', verifyToken,  )

/*
    @ dev : Get Requested Authentication Request
    @ desc : Holder로 부터 인증 요청 목록을 출력합니다.
    @ subject : Verifer
*/
router.get('/:holderId', verifyToken, )

/*
    @ dev : Get Requested Authentication Request
    @ desc : Holder로 부터의 전체 인증 요청 목록을 출력합니다.
    @ subject : Verifer
*/
router.get('/request-auths', verifyToken, )

/*
    @ dev : Close Authentication From Verifier
    @ desc : Holder로 부터 들어온 인증 요청을 처리+마무리 합니다.    
        - params의 verifiyListId로 요청을 특정합니다.
    @ subject : Verifer
*/
router.post('/auth-vp:verifiyListId', verifyToken, )

module.exports = router;
