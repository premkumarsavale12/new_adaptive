export async function FetchMarketShield(raw){

    // var raw = JSON.stringify({
    //     portfolio_name: portfolio_name,
    //     portfolio_value: portfolio_value,
    //     protection_period: protection_period
    // });


    var requestOptions = {
        method: "POST",
        body: raw,
        redirect: "follow",
    };

    // return false;

    try {

        const response = await fetch(
            process.env.NEXT_PUBLIC_FETCH_MARKET_SHIELD_DATA,
            requestOptions
        );
        const data = await response.json();
        if (data["result"] !== "") {
            return data["result"];
            // return false;
        } else {

            return false;
        }
    } catch (error) {
        if (error.name === "AbortError") {
            alert("The request timed out, Please try again");
            window.location.reload();
        }
        else {
            return 0
        }
    }
}
