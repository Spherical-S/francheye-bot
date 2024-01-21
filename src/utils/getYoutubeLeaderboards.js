module.exports = async () => {

    try {
        const response = await fetch("https://successful-pink-tutu.cyclic.app/api/v1/leaderboard/youtube");
        const r = await response.json();

        if (response.status == 200) {
            return [true, r];
        } else {
            return [false, {}];
        }
    } catch (error) {
        return [false, {}];
    }

};