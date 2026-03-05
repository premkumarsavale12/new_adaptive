export async function UpdateLeads(
  EmailId,
  UserType,
  FullName,
  FirmName,
  About) {

  var raw = JSON.stringify({
    email_id: EmailId,
    toupdate:{
      usertype: UserType,
      name: FullName,
      firmname: FirmName,
      description: About,
      adddetailflag: 'True'},
  });
 

  var requestOptions = {
    method: "PATCH",
    body: raw,
    redirect: "follow"
  };

  const response = await fetch(
    /*process.env.NEXT_PUBLIC_PORTFOLIO_API,*/
    /*'https://62ayc3l0fc.execute-api.us-east-1.amazonaws.com/Stage/corporate-lead',*/
    process.env.NEXT_PUBLIC_UPDATE_LEAD,
    requestOptions
  );
  if (!response.ok) {
    alert("Could not add your details");
  } else {
    const message = await response.json();
    if (message["result"] !== "") {
 
      return message["result"];
    } else {
    
      alert("Could not add these details");
      return "";
    }
  }
}
