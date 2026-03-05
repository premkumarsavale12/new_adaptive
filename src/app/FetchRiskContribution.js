export async function FetchRiskContribution(portfolio_name, portfolio_value) {

    var raw = JSON.stringify({
        portfolio_name: portfolio_name,
        portfolio_value: portfolio_value
    });

   //   console.log("raw", raw)

    var requestOptions = {
        method: "POST",
        body: raw,
        // headers: header,
        redirect: "follow",
    };

    try {

        const response = await fetch(
            process.env.NEXT_PUBLIC_PORTFOLIO_RISK_CONTRIBUTION_API,
            requestOptions
        );
        const data = await response.json();
        if (data["result"] !== "") {
            return data;
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
