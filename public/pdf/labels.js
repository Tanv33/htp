

const labels = (barcode, qrcode) => { 

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Document</title>
    </head>
    <style>
        .container {
            // width: 8.5in;
            // height: 11in;
            display: flex;
            flex-wrap: wrap;
            margin: 0.6875in 0.125in 0.6875in 0.52in;
        }
        .box{
            width: 1.73in;
            height: 0.2in;
            min-width: 1.73in;
            min-height: 0.25in;
            // border: 1px solid black;
            margin-right: 0.105in;
            border-radius: 4px;
            display: flex;
            padding: 1px;
            align-items: center;
            justify-content: center;
            margin-top: 0.103in
        }
        .barcode{
            width: 1.35in;
            height: 0.18in;
        }
        .qrcode{
            width: .25in;
            height: .24in;
        }
    </style>
    <body>
        <div class="container" >
            <div class="box" style="margin-top: 0">   
                <img class="barcode"  src="data:image/png;base64,${barcode[0] &&  barcode[0].barcode_1}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[0] &&  qrcode[0].qrcode_1}"/>
            </div>
            <div class="box" style="margin-top: 0">
                <img class="barcode"  src="data:image/png;base64,${barcode[1] &&  barcode[1].barcode_2}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[1] &&  qrcode[1].qrcode_2}"/>
            </div>
            <div class="box" style="margin-top: 0">
                <img class="barcode"  src="data:image/png;base64,${barcode[2] &&  barcode[2].barcode_3}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[2] &&  qrcode[2].qrcode_3}"/>
            </div>
            <div class="box" style="margin-top: 0">
                <img class="barcode"  src="data:image/png;base64,${barcode[3] &&  barcode[3].barcode_4}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[3] &&  qrcode[3].qrcode_4}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[4] &&  barcode[4].barcode_5}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[4] &&  qrcode[4].qrcode_5}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[5] &&  barcode[5].barcode_6}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[5] &&  qrcode[5].qrcode_6}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[6] &&  barcode[6].barcode_7}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[6] &&  qrcode[6].qrcode_7}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[7] &&  barcode[7].barcode_8}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[7] &&  qrcode[7].qrcode_8}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[8] &&  barcode[8].barcode_9}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[8] &&  qrcode[8].qrcode_9}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[9] &&  barcode[9].barcode_10}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[9] &&  qrcode[9].qrcode_10}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[10] &&  barcode[10].barcode_11}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[10] &&  qrcode[10].qrcode_11}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[11] &&  barcode[11].barcode_12}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[11] &&  qrcode[11].qrcode_12}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[12] &&  barcode[12].barcode_13}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[12] &&  qrcode[12].qrcode_13}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[13] &&  barcode[13].barcode_14}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[13] &&  qrcode[13].qrcode_14}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[14] &&  barcode[14].barcode_15}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[14] &&  qrcode[14].qrcode_15}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[15] &&  barcode[15].barcode_16}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[15] &&  qrcode[15].qrcode_16}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[16] &&  barcode[16].barcode_17}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[16] &&  qrcode[16].qrcode_17}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[17] &&  barcode[17].barcode_18}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[17] &&  qrcode[17].qrcode_18}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[18] &&  barcode[18].barcode_19}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[18] &&  qrcode[18].qrcode_19}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[19] &&  barcode[19].barcode_20}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[19] &&  qrcode[19].qrcode_20}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[20] &&  barcode[20].barcode_21}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[20] &&  qrcode[20].qrcode_21}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[21] &&  barcode[21].barcode_22}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[21] &&  qrcode[21].qrcode_22}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[22] &&  barcode[22].barcode_23}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[22] &&  qrcode[22].qrcode_23}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[23] &&  barcode[23].barcode_24}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[23] &&  qrcode[23].qrcode_24}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[24] &&  barcode[24].barcode_25}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[24] &&  qrcode[24].qrcode_25}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[25] &&  barcode[25].barcode_26}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[25] &&  qrcode[25].qrcode_26}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[26] &&  barcode[26].barcode_27}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[26] &&  qrcode[26].qrcode_27}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[27] &&  barcode[27].barcode_28}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[27] &&  qrcode[27].qrcode_28}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[28] &&  barcode[28].barcode_29}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[28] &&  qrcode[28].qrcode_29}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[29] &&  barcode[29].barcode_30}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[29] &&  qrcode[29].qrcode_30}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[30] &&  barcode[30].barcode_31}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[30] &&  qrcode[30].qrcode_31}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[31] &&  barcode[31].barcode_32}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[31] &&  qrcode[31].qrcode_32}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[32] &&  barcode[32].barcode_33}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[32] &&  qrcode[32].qrcode_33}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[33] &&  barcode[33].barcode_34}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[33] &&  qrcode[33].qrcode_34}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[34] &&  barcode[34].barcode_35}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[34] &&  qrcode[34].qrcode_35}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[35] &&  barcode[35].barcode_36}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[35] &&  qrcode[35].qrcode_36}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[36] &&  barcode[36].barcode_37}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[36] &&  qrcode[36].qrcode_37}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[37] &&  barcode[37].barcode_38}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[37] &&  qrcode[37].qrcode_38}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[38] &&  barcode[38].barcode_39}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[38] &&  qrcode[38].qrcode_39}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[39] &&  barcode[39].barcode_40}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[39] &&  qrcode[39].qrcode_40}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[40] &&  barcode[40].barcode_41}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[40] &&  qrcode[40].qrcode_41}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[41] &&  barcode[41].barcode_42}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[41] &&  qrcode[41].qrcode_42}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[42] &&  barcode[42].barcode_43}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[42] &&  qrcode[42].qrcode_43}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[43] &&  barcode[43].barcode_44}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[43] &&  qrcode[43].qrcode_44}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[44] &&  barcode[44].barcode_45}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[44] &&  qrcode[44].qrcode_45}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[45] &&  barcode[45].barcode_46}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[45] &&  qrcode[45].qrcode_46}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[46] &&  barcode[46].barcode_47}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[46] &&  qrcode[46].qrcode_47}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[47] &&  barcode[47].barcode_48}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[47] &&  qrcode[47].qrcode_48}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[48] &&  barcode[48].barcode_49}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[48] &&  qrcode[48].qrcode_49}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[49] &&  barcode[49].barcode_50}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[49] &&  qrcode[49].qrcode_50}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[50] &&  barcode[50].barcode_51}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[50] &&  qrcode[50].qrcode_51}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[51] &&  barcode[51].barcode_52}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[51] &&  qrcode[51].qrcode_52}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[52] &&  barcode[52].barcode_53}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[52] &&  qrcode[52].qrcode_53}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[53] &&  barcode[53].barcode_54}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[53] &&  qrcode[53].qrcode_54}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[54] &&  barcode[54].barcode_55}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[54] &&  qrcode[54].qrcode_55}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[55] &&  barcode[55].barcode_56}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[55] &&  qrcode[55].qrcode_56}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[56] &&  barcode[56].barcode_57}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[56] &&  qrcode[56].qrcode_57}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[57] &&  barcode[57].barcode_58}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[57] &&  qrcode[57].qrcode_58}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[58] &&  barcode[58].barcode_59}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[58] &&  qrcode[58].qrcode_59}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[59] &&  barcode[59].barcode_60}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[59] &&  qrcode[59].qrcode_60}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[60] &&  barcode[60].barcode_61}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[60] &&  qrcode[60].qrcode_61}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[61] &&  barcode[61].barcode_62}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[61] &&  qrcode[61].qrcode_62}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[62] &&  barcode[62].barcode_63}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[62] &&  qrcode[62].qrcode_63}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[63] &&  barcode[63].barcode_64}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[63] &&  qrcode[63].qrcode_64}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[64] &&  barcode[64].barcode_65}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[64] &&  qrcode[64].qrcode_65}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[65] &&  barcode[65].barcode_66}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[65] &&  qrcode[65].qrcode_66}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[66] &&  barcode[66].barcode_67}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[66] &&  qrcode[66].qrcode_67}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[67] &&  barcode[67].barcode_68}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[67] &&  qrcode[67].qrcode_68}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[68] &&  barcode[68].barcode_69}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[68] &&  qrcode[68].qrcode_69}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[69] &&  barcode[69].barcode_70}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[69] &&  qrcode[69].qrcode_70}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[70] &&  barcode[70].barcode_71}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[70] &&  qrcode[70].qrcode_71}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[71] &&  barcode[71].barcode_72}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[71] &&  qrcode[71].qrcode_72}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[72] &&  barcode[72].barcode_73}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[72] &&  qrcode[72].qrcode_73}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[73] &&  barcode[73].barcode_74}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[73] &&  qrcode[73].qrcode_74}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[74] &&  barcode[74].barcode_75}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[74] &&  qrcode[74].qrcode_75}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[75] &&  barcode[75].barcode_76}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[75] &&  qrcode[75].qrcode_76}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[76] &&  barcode[76].barcode_77}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[76] &&  qrcode[76].qrcode_77}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[77] &&  barcode[77].barcode_78}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[77] &&  qrcode[77].qrcode_78}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[78] &&  barcode[78].barcode_79}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[78] &&  qrcode[78].qrcode_79}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[79] &&  barcode[79].barcode_80}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[79] &&  qrcode[79].qrcode_80}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[80] &&  barcode[80].barcode_81}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[80] &&  qrcode[80].qrcode_81}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[81] &&  barcode[81].barcode_82}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[81] &&  qrcode[81].qrcode_82}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[82] &&  barcode[82].barcode_83}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[82] &&  qrcode[82].qrcode_83}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[83] &&  barcode[83].barcode_84}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[83] &&  qrcode[83].qrcode_84}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[84] &&  barcode[84].barcode_85}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[84] &&  qrcode[84].qrcode_85}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[85] &&  barcode[85].barcode_86}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[85] &&  qrcode[85].qrcode_86}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[86] &&  barcode[86].barcode_87}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[86] &&  qrcode[86].qrcode_87}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[87] &&  barcode[87].barcode_88}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[87] &&  qrcode[87].qrcode_88}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[88] &&  barcode[88].barcode_89}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[88] &&  qrcode[88].qrcode_89}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[89] &&  barcode[89].barcode_90}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[89] &&  qrcode[89].qrcode_90}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[90] &&  barcode[90].barcode_91}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[90] &&  qrcode[90].qrcode_91}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[91] &&  barcode[91].barcode_92}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[91] &&  qrcode[91].qrcode_92}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[92] &&  barcode[92].barcode_93}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[92] &&  qrcode[92].qrcode_93}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[93] &&  barcode[93].barcode_94}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[93] &&  qrcode[93].qrcode_94}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[94] &&  barcode[94].barcode_95}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[94] &&  qrcode[94].qrcode_95}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[95] &&  barcode[95].barcode_96}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[95] &&  qrcode[95].qrcode_96}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[96] &&  barcode[96].barcode_97}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[96] &&  qrcode[96].qrcode_97}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[97] &&  barcode[97].barcode_98}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[97] &&  qrcode[97].qrcode_98}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[98] &&  barcode[98].barcode_99}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[98] &&  qrcode[98].qrcode_99}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[99] &&  barcode[99].barcode_100}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[99] &&  qrcode[99].qrcode_100}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[100] &&  barcode[100].barcode_101}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[100] &&  qrcode[100].qrcode_101}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[101] &&  barcode[101].barcode_102}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[101] &&  qrcode[101].qrcode_102}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[102] &&  barcode[102].barcode_103}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[102] &&  qrcode[102].qrcode_103}"/>
            </div>
            <div class="box">
                <img class="barcode"  src="data:image/png;base64,${barcode[103] &&  barcode[103].barcode_104}"/>
                <img class="qrcode" src="data:image/png;base64,${qrcode[103] &&  qrcode[103].qrcode_104}"/>
            </div>
            
        </div>
    </body>
    </html>`
}

module.exports = labels;