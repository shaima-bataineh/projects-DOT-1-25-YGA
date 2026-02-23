// see my profile info protected by auth middleware.

function getProfile(req, res) {
    res.json({ 
        ok: true,
        message: "This is your profile info, only accessible if you are authenticated",
        user: req.user // this will contain the user info that was set by the auth middleware

    
    });
}

module.exports = {
    getProfile
};