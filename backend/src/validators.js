let validator = {};

//https://dicasdeprogramacao.com.br/algoritmo-para-validar-cpf/
validator.cpf_digs = (cpf) => {
    if(cpf.split('').every(chr => chr === cpf[0])){
        return false;
    }

    let dig = 0;
    for(let mul = 10, i = 0; mul >= 2; --mul){
        dig += (cpf[i++] * mul);
    }
    dig = (dig * 10) % 11;

    if(cpf.at(-2) != dig){
        return false;
    }
    
    dig = 0;
    for(let mul = 11, i = 0; mul >= 2; --mul){
        dig += (cpf[i++] * mul);
    }
    dig = (dig * 10) % 11;

    return cpf.at(-1) == dig;
};

// https://andersonarruda.com.br/article/ValidandocelularbrasileirocomExpressaoRegular/9
validator.phone_number_digs = (num) => {
    return num.match(/^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/);
};

// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript#comment17773334_46181
validator.basic_email = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
};

//https://stackoverflow.com/questions/15491894/regex-to-validate-date-formats-dd-mm-yyyy-dd-mm-yyyy-dd-mm-yyyy-dd-mmm-yyyy
validator.birth_date = (date) => {
    if(!date.match(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)){
        return false;
    }

    let parts = date.split('-');

    let bdate = new Date(`${parts[2]}/${parts[1]}/${parts[0]}`);
    
    let diff_date = new Date(Date.now() - bdate);

    return Math.abs(diff_date.getUTCFullYear() - 1970) >= 18;
};

validator.name = (name) =>{
    let rgx = /^[^a-zA-Z]*$/;
    let split_name = name.split(' ');

    if(split_name.length < 2){
        return false;
    }

    for(let i in split_name){
        if(!rgx.test(split_name[i])){
            continue;
        }

        return false;
    }

    return true;
};

export default validator;

