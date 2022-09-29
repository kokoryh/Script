const message = {
    action: "get_policy_state"
};

let ssid;
ssid = $environment.ssid

$configuration.sendMessage(message).then(resolve => {
    console.log(ssid)
    if (resolve.error) {
        console.log(resolve.error);
    }
    if (resolve.ret) {
        let output=JSON.stringify(resolve.ret);
        console.log(output);
    }
    $done();
}, reject => {
    // Normally will never happen.
    $done();
});
