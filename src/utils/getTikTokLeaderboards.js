module.exports = async () => {
    try{
        const response = await fetch("https://successful-pink-tutu.cyclic.app/api/v1/leaderboard/tiktok");
        const r = await response.json();

        if(response.status == 200){
            return [true, r];
        } else {
            return [false, {}];
        }
    } catch (error) {
        return [false, {}];
    }
};