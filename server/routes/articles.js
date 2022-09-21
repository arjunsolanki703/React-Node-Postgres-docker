module.exports = (app) => {
    const { check, validationResult } = require("express-validator");
    const articles = require("../controllers/articles.controller.js");
    var router = require("express").Router();


    // Retrieve all company
    router.post("/articles", articles.insertArticle);

    router.get("/articles", articles.getArticle);

    router.get("/articles/:rid", articles.getOneArticle);

    router.delete("/articles/:rid", articles.deleteArticle);
    
    router.put("/articles/:rid", articles.updateArticle);

    // router.post("/createCompany", [
    //     check("companyName").not().isEmpty().trim().escape(),
    // ], company.createCompany);


    // router.post("/update_current_company", [
    //     check("companyId").not().isEmpty().trim().escape(),
    // ], company.update_current_company);

    app.use('/', router);
};