/**
 * Created by simba on 2017/7/26.
 */

var type = 1;
var no = 1;

var title = '';
var navTitle = '';
var html1 = '<div class="help_col show">\
                <p>\
                <strong>第一步：</strong>先进入彩彩客彩票网：<span style="color:#E53333;">www.caicaike.com</span>；或进入本站所公布的网址。<br>\
            <strong>第二步：</strong>点击“<span style="color:#E53333;">免费注册</span>”或“<span style="color:#E53333;">立即注册</span>”等注册字样。\
            </p>\
            <p style="text-align: center">\
                <a href="images/register/zc1.jpg"> <img src="images/register/zc1.jpg" style="border:#cccccc 1px solid" width="700" height="450" title="点击放大图片"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
            <br>\
            <p>\
            <strong>第三步：</strong>根据提示，依次输入<span style="color:#E53333;">手机号、密码、验证码和推荐人ID</span>。点击“<span style="color:#E53333;">立即注册</span>”。<br>\
            </p>\
            <p style="text-align: center">\
                <a href="images/register/zc2.jpg"><img src="images/register/zc2.jpg" style="border:#cccccc 1px solid" width="700" height="389" title="点击放大图片"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
            <br><br>\
            <p>\
            <strong>第四步：</strong>“<span style="color:#E53333;">注册成功</span>”跳至首页。如图显示<br>\
            </p>\
            <p style="text-align: center">\
                <a href="images/register/zc3.jpg"><img src="images/register/zc3.jpg" title="点击放大图片" style="border:#cccccc 1px solid" width="700" height="390"></a> <br>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3><br>\
            </div>';           
var html2 = '<div class="help_col show">\
                <p><strong>1、</strong>用户名一旦提交，不可更改，请选择容易记忆且安全级别高的用户名，并妥善保管。</p>\
                <p><strong>2、</strong>为确保用户中奖权益，请务必注册后，在“会员中心”的“账户设置”或“银行卡管理”页面<br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;绑定银行卡。银行卡户名必须与注册时的真实姓名相同，否则提款将不成功。</p>\
                <p> <strong>3、</strong>请填写真实有效的手机号码与电子邮件，以便在您中大奖时能及时与您取得联系。</p>\
                <p><strong>4、</strong>注册时需要验证手机或者邮箱，一个手机最多可以验证绑定1个账户，一个邮箱只可以验证注册一个账户。 </p>\
            </div>';            
var html3 = '<div class="help_col show">\
                <p>\
                    一个人真实手机号只可以注册1个彩彩客彩票网会员名，为了更好保障用户帐号资金安全，请如实填写个人真实资料。<br><br>\
                </p>\
            </div>';            
var html4 = '<div class="help_col show">\
                <p>\
                    为了不影响您的充值、投注和提款，注册后须在会员中心绑定银行卡。  </p>\
            </div>';
var html5 = '<div class="help_col show">\
                <p> 一经绑定，用户本人无法直接修改真实姓名，但可以联系客服人员进行修改。操作流程如下：</p>\
                <p>&nbsp;&nbsp;&nbsp;&nbsp;(1)、联系客服人员（可通过在线客服、电话、QQ等途径），说明修改的原因。</p>\
                <p>&nbsp;&nbsp;&nbsp;&nbsp;(2)、客服部收到申请后，由专员核实信息提交报告，交领导批准签字。</p>\
                <p>&nbsp;&nbsp;&nbsp;&nbsp;(3)、主管领导签字后，技术主管在专员监督的情况下，修改用户的错误信息。 </p>\
            </div>';
var html6 ='<div class="help_col show">\
                <p>\
                    <strong>第一步</strong>：登录后，点击“<span style="color:#E53333;">会员中心</span>”，进入“会员中心”。点击“<span style="color:#E53333;">账户设置</span>”。</p>\
                <p style="text-align: center">\
                    <a href="images/revise/xz1.jpg"> <img src="images/revise/xz1.jpg" title="点击放大图片" width="700"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <br>\
                <p style="text-align: center">\
                    <a href="images/revise/xz2.jpg"> <img src="images/revise/xz2.jpg" title="点击放大图片" width="700"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <br>\
                <p>\
                    <strong>第二步</strong>：依次输入正确的信息。确认无误后，点击“<span style="color:#E53333;">确认</span>”。手机与邮件一旦确认，便无法修改，实在有问题需要修改，请联系客服。\
                </p>\
                <p style="text-align: center">\
                    <a href="images/revise/xz4.jpg"> <img src="images/revise/xz4.jpg" title="点击放大图片" width="700"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
            </div>';
var html7 = '<div class="help_col show">\
				<p>\
                <strong>第一步</strong>：登陆后，点击“<span style="color:#E53333;">会员中心</span>”，进入“会员中心”。点击“<span style="color:#E53333;">账户设置</span>”。\
				</p>\
                <p style="text-align: center">\
                    <a href="images/revise/xz1.jpg"><img src="images/revise/xz1.jpg" title="点击放大图片" width="700"></a>\
                </p>\
                <h3 style="text-align: center; color: #fa4100;">(点击图片放大) &nbsp;↑</h3>\
                <br>\
                <p style="text-align: center">\
                    <a href="images/revise/xz2.jpg"><img src="images/revise/xz2.jpg" title="点击放大图片" width="700"> </a>\
                </p>\
                <p>\
                </p><h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <p></p>\
                <br>\
                <p>\
                    <strong>第二步</strong>：点击“<span style="color:#E53333;">登录密码</span>”：输入原密码，再输入新密码，然后点击“<span style="color:#E53333;">确认修改</span>”。\
                </p>\
                <p style="text-align: center">\
                    <a href="images/revise/xz3.jpg"><img src="images/revise/xz3.jpg" title="点击放大图片" width="700"> </a>\
                </p>\
                <h3 style="color: #fa4100;text-align: center">(点击图片放大) &nbsp;↑</h3>\
            </div>';
var html8 = '<div class="help_col show">\
                <p>&nbsp;&nbsp;&nbsp;&nbsp;本站禁止向未成年人开放。 </p>\
                <p>&nbsp;&nbsp;&nbsp;&nbsp;对于实名认证结果显示未满18周岁的用户，网站将暂时限制其充值和购彩，除此之外的其他操作不受影响。 </p>\
                <p>&nbsp;&nbsp;&nbsp;&nbsp;正在进行中的已投注方案，将按照原规则进行兑奖、派奖； </p>\
                <p>&nbsp;&nbsp;&nbsp;&nbsp;如投注撤单，购彩金将退回账户； </p>\
                <p>&nbsp;&nbsp;&nbsp;&nbsp;追号方案、自动跟单、订制服务等与购彩相关服务也将被终止； </p>\
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<strong>如果您未满18周岁，请自觉遵守法规规定，务必不要购买彩票。</strong>\
                </p>\
            </div>';


var html9 = '<div class="help_col show">\
                <p>\
                   <strong>第一步</strong>：登陆后，点击“<span style="color:#E53333;">充值</span>”进入充值页面。<br>\
                    或"点击“<span style="color:#E53333;">会员中心</span>”进入“会员中心”界面，点击“<span style="color:#E53333;">账号充值</span>”进入充值页面。\
                </p>\
                <p style="text-align: center">\
                    <a href="images/recharge/cz1.jpg"><img src="images/recharge/cz1.jpg" width="700"></a>\
                </p>\
                <p style="text-align: center">\
                    <a href="images/recharge/cz8.jpg"><img width="700" src="images/recharge/cz8.jpg"></a>\
                </p>\
                <p>\
                </p><h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <p></p>\
                <br>\
                <p>\
                <strong>第二步</strong>：根据提示，<span style="color:#E53333;">选择收款银行,然后转账至该账户</span>。随后填写好转出银行、转账方式、充值金额、银行账号。最后，点击“提交”。\
                </p>\
                <p style="text-align: center">\
                <a href="images/recharge/cz2.jpg"> <img width="700" src="images/recharge/cz2.jpg"></a>\
                </p>\
                <p>\
                </p><h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <p></p>\
            </div>';
var html10 = '<div class="help_col show">\
                <p>\
                    <strong>第一步</strong>：登录后，进入会员中心的“<span style="color:#E53333;">账户充值</span>”，然后点击“<span style="color:#E53333;">支付宝或微信(在线充值)</span>。”如图：\
                </p>\
                <p style="text-align: center">\
                    <a href="images/recharge/cz3.jpg"><img width="700" src="images/recharge/cz3.jpg"></a>\
                </p>\
                <p>\
                </p><h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <p></p>\
                <br>\
                <p>\
                    <strong>第二步</strong>：选择“<span style="color:#E53333;">支付渠道</span>”，选择“<span style="color:#E53333;">充值金额</span>”，点击“<span style="color:#E53333;">提交</span>”\
                </p>\
                <p style="text-align: center">\
                <a href="images/recharge/cz4.jpg"><img width="700" src="images/recharge/cz4.jpg"></a>\
                </p>\
                <p>\
                </p><h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <p></p>\
                <br>\
                <p>\
                    <strong>第三步</strong>：打开手机中的支付宝APP，用“<span style="color:#E53333;">扫一扫</span>”功能进行支付。\
                </p>\
                <p style="text-align: center">\
                <a href="images/recharge/cz5.jpg"><img width="700" src="images/recharge/cz5.jpg"></a><br>\
                </p>\
                <p>\
                </p><h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <p></p>\
                <br>\
                <p>\
                    <strong>第四步</strong>：选择“<span style="color:#E53333;">付款方式</span>”，然后点击立即付款。 <br>\
                </p>\
                <p style="text-align: center">\
                    <a href="images/recharge/cz7.jpg"><img width="640" src="images/recharge/cz7.jpg"></a><br>\
                </p>\
                <p>\
                </p><h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <p></p>\
            </div>';
var html11 = '<div class="help_col show">\
                <p>\
                    <strong>第一步</strong>：登录后，进入会员中心的，“<span style="color:#E53333;">账户充值</span>”。 <br>\
                    <strong>第二步</strong>：点击“<span style="color:#E53333;">支付宝或微信(在线充值)</span>”，“<span style="color:#E53333;">选择充值金额</span>”，点击“<span style="color:#E53333;">提交</span>”。<br>\
                    如图： <br>\
                </p>\
                <p style="text-align: center">\
                    <a href="images/recharge/cz3.jpg"><img width="700" src="images/recharge/cz3.jpg"></a>\
                </p>\
                <p>\
                </p><h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <p></p>\
                <br>\
                <p>\
                    <strong>第三步</strong>：用微信，<span style="color:#E53333;">扫一扫“二维码”</span>”。点击“<span style="color:#E53333;">立即支付</span>””，输入密码进行支付。\
                </p>\
                <p style="text-align: center">\
                <a href="images/recharge/cz4.jpg"><img width="700" src="images/recharge/cz4.jpg"></a>\
                </p>\
                <p>\
                </p><h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
            </div>';
var html12 = '<div class="help_col show">\
                <p>\
                    &nbsp; &nbsp; &nbsp; &nbsp; 银行转账、在线支付、支付宝转账、支付宝扫码支付、微信转账、微信扫码支付、点卡支付等常用支付方式。<br>\
                    &nbsp; &nbsp; &nbsp; &nbsp; 充值方式会随时更新，具体充值方式请进入“<span style="color:#E53333;">会员中心</span>”的“<span style="color:#E53333;">账户充值</span>”查看。\
                </p>\
            </div>';
var html13 = '<div class="help_col show">\
                <p>\
                    &nbsp; &nbsp; &nbsp; &nbsp; 网银在线支付、微信支付、支付宝支付、点卡支付：确认支付成功后即时到账。注：若长时间不到帐，请联系在线客服！<br>\
                    &nbsp; &nbsp; &nbsp; &nbsp; 银行转账、支付宝转账、微信转账：提交申请后5分钟内到账。注：若长时间不到帐，请联系在线客服！\
                </p>\
            </div>';
var html14 = '<div class="help_col show">\
                <p>\
                    &nbsp; &nbsp; &nbsp; &nbsp; 请您提供<span style="color:#E53333;">用户名+充值方式+充值金额+交易号</span>致<span style="color:#E53333;">QQ客服或在线客服</span>人员核实，15分钟后再查看账户余额情况，若未到账，请核实是否成功扣款，若成功扣款，请提供充值订单号再次核实查询。\
                </p>\
            </div>';
var html15 = '<div class="help_col show">\
                <p>\
               所有支付方式本站都是免手续费的。注：除银行与第三方平台需要收取的费用。\
                </p>\
            </div>';
var html16 = '<div class="help_col show">\
                <p>\
                    <strong>网上支付未及时到帐可能有以下几个原因造成：</strong><br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第一，由于网速或者支付接口等问题，支付数据没有及时传送到支付系统造成的； <br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第二，网速过慢，数据传输超时，使银行后台支付信息不能成功对接，导致银行交易成功而支付后台显示失败； <br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第三，在网上支付如果使用某些防火墙软件，有时会屏蔽银行接口的弹出窗口，这时会造成在银行那边被扣费，但在我们网站上显示尚没支付。但请您放心，每天我们都会根据银行系统的帐务明细清单对前一天的订单进行逐笔核对，如遇问题订单，我们会做手工添加。\
                </p>\
            </div>';
var html17 = '<div class="help_col show">\
				<p>\
				   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;网上银行充值需要您已经开通对应银行卡的网上银行业务。（具体可到各相应银行营业点咨询） <br>\
				    （1）在银行柜台办理开通网上支付业务，需提供如下资料：申请人本人有效身份证件、所需注册的本地银行卡。 <br>\
				    （2）银行经办员审核上述资料无误后，将与客户签署《网上银行个人客户服务协议》，办理注册资料录入、设置网上银行密码等注册手续。 各银行官方网站。\
				</p>\
                <p>\
                </p><table width="700;">\
                    <tbody><tr>\
                        <td style="text-align: center;">\
                            <a href="http://www.icbc.com.cn " target="_blank">工商银行网上银行官方网站</a><br>\
                            <a href="http://www.cmbchina.com" target="_blank">招商银行网上银行官方网站</a><br>\
                            <a href="http://www.95599.cn" target="_blank">农业银行网上银行官方网站</a><br>\
                            <a href="http://www.ccb.com" target="_blank">建设银行网上银行官方网站</a><br>\
                            <a href="http://www.spdb.com.cn/chpage/c1" target="_blank">浦发银行网上银行官方网站</a><br>\
                            <a href="http://www.bankcomm.com" target="_blank">交通银行网上银行官方网站</a><br>\
                        </td>\
                        <td style="text-align: center;">\
                            <a href="http://www.cib.com.cn/netbank/cn/index.html" target="_blank">兴业银行网上银行官方网站</a><br>\
                            <a href="http://www.cmbc.com.cn" target="_blank">民生银行网上银行官方网站</a><br>\
                            <a href="http://www.cebbank.com/Site/ceb/cn" target="_blank">光大银行网上银行官方网站</a><br>\
                            <a href="http://www.ecitic.com" target="_blank">中信银行网上银行官方网站</a><br>\
                            <a href="http://www.gdb.com.cn/" target="_blank">广发银行网上银行官方网站</a><br>\
                        </td>\
                    </tr>\
                </tbody></table>\
                <p></p>\
            </div>';


var html18 = '<div class="help_col show">\
                <p>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无论您的中奖金额是多少，我们都会在开奖后及时将您的税后奖金派发到您的彩彩客彩票网帐户，您可以随时提款到自己银行卡。\
                </p>\
            </div>';
var html19 = '<div class="help_col show">\
                <p>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据《中华人民共和国反洗钱法》、《中华人民共和国中国人民银行法》、《金融机构反洗钱规定》等法律规定和银行/第三方支付等机构的规定，为了防止洗钱及信用卡套现等违法犯罪行为，保护正常用户的资金安全，本站特针对提款做出如下规定： 奖金余额，返点余额提现不收取任何手续费，若超出奖金余额+返点余额，充值余额部分提现需要收取10%手续费。<br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;友情提示：如果有明显洗钱或套现行为的，即使提现不超过奖金余额+返点余额，提款仍按原路退回，到账时间约为15个工作日（受银行处理速度限制可能延长）。\
                </p>\
            </div>';
var html20 = '<div class="help_col show">\
                <p>\
                    提款未按时到账或失败可能有以下几点原因：<br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）户名错误、姓名填写有误、请核对卡号与姓名是否相符：银行卡开卡的真实姓名与彩彩客彩票网账户中的真实姓名不一致导致无法提款成功；彩彩客彩票网账户中的真实姓名填写有误（如注册的名字有繁体字或者有分隔符）、用户的姓名中含有生僻字，银行开户时以同音字或其他符号代替）<br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）卡片状态不正常：银行卡为无效卡或银行卡状态异常，请联系银行卡背面的客服热线，寻求帮助。<br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）账户控制状态不允许存入：该卡号不允许存入资金。 <br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（4）非法卡：银行卡已经注销。 <br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;友情提示：以上情况，请联系银行卡背面的客服热线，确认银行卡相应信息准确无误后，直接联系彩彩客彩票网客服。<br>\
                    （5）银行卡相关信息不符，如：银行名称、开户支行、开户人、银行帐号等。 <br>\
                    （6）系统繁忙，请重试：您的开户行银行系统繁忙或者正在升级，您可以重新申请。<br>\
                    （7）参加活动所赠送的返点不可提现。<br>\
                    （8）其他情况（您的账户异常情况）。\
                </p>\
            </div>';
var html21 = '<div class="help_col show">\
                <p>\
                    提款申请审核后，网站会以信件形式通知至会员中心，请注意查看。<br><br>\
                </p>\
            </div>';
var html22 = '<div class="help_col show">\
                <p>\
                    <strong>第一步</strong>：登录后，点击“<span style="color:#E53333;">提款</span>”或进入“<span style="color:#E53333;">会员中心</span>”的“<span style="color:#E53333;">快速提现</span>”。\
                </p>\
                <p style="text-align: center">\
                <a href="images/drawing/tx1.jpg"><img width="700" src="images/drawing/tx1.jpg"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <br>\
                <p>\
                    <strong>第二步</strong>：选择提款的银行账号，输入提款金额，点击“提交”。等待审核通过。（如果是首次提款，请先绑定银行卡）\
                </p>\
                <p style="text-align: center">\
                <a href="images/drawing/tx2.jpg"><img width="700" src="images/drawing/tx2.jpg"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <br><br>\
            </div>';
var html23 = '<div class="help_col show">\
                <p>\
                    除存款外，所得奖金提款无需手续费。提款时所产生的银行手续费将全部由本站为您承担。\
                </p>\
            </div>';
var html24 = '<div class="help_col show">\
                <p>\
                    本站单笔提款最低金额为100元，无最高限制。\
                </p>\
            </div>';
var html25 = '<div class="help_col show">\
                <p>\
                    本网站不限制提款次数，但每次最低提款为100元。\
                </p>\
            </div>';
var html26 = '<div class="help_col show">\
                <p>\
                    提款不成功分两种情况：<br>\
                    （1）提款申请未成功：<br>\
                    提款金额大于账户实有金额、系统错误或违规手段导致的非法金额。<br>\
                    银行卡信息不符合规定格式。<br>\
                    （2）申请提款成功，但款项没有到达指定账户：<br>\
                    银行卡卡号填写错误，与用户姓名不符，银行退单。<br>\
                </p>\
                <p>\
                    <strong style="color:red;">一旦发生上述现象，请及时联系客服，由客服人员为您服务。</strong>\
                </p>\
            </div>';
var html27 = '<div class="help_col show">\
                <p>\
                    <strong>第一步</strong>：登录彩票网。点击“<span style="color:#E53333;">历史记录</span>”或进入“<span style="color:#E53333;">会员中心</span>”在点击“<span style="color:#E53333;">历史记录</span>”，如图所示：\
                </p>\
                <p style="text-align: center">\
                    <a href="images/winning/zj1.jpg"><img width="700" src="images/winning/zj1.jpg"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3> <br>\
                <p style="text-align: center">\
                <a href="images/winning/zj2.jpg"><img width="700" src="images/winning/zj2.jpg"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3> <br>\
                <!--<p>\
                    <strong>第二步</strong>：点击“<span style="color:#E53333;">投注记录</span>”，选择状态“<span style="color:#E53333;">已结算</span>”，选好当时投注的时间，点击“<span style="color:#E53333;">筛选</span>”。如图所示：<br>\
                </p>\
                <p style="text-align: center">\
                <a href="http://www.600wan.cm:443/static/theme/600w/img/zj3.png"><img width="700" src="http://www.600wan.cm:443/static/theme/600w/img/zj3.png"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3> <br>\
                <p>\
                   所有在当前时间范围的中奖记录都会显示出来。\
                </p>\
                <p style="text-align: center">\
                <a href="http://www.600wan.cm:443/static/theme/600w/img/zj4.png"><img width="700" src="http://www.600wan.cm:443/static/theme/600w/img/zj4.png"></a>\
                </p>-->\
            </div>';



var html28 = '<div class="help_col show">\
                <p>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;彩彩客彩票网提供了银行转账、在线支付、支付宝支付、微信支付等多种充值支付方式。\
                    与各大银行开通直联网关，彻底解决通过银行转账进行支付的不安全因素。\
                   	 另外与支付宝、微信、第三方平台等公司进行合作。为用户提供安全、稳定、快速的资金支付方式，完全保障用户的支付安全。\
                </p>\
            </div>';
var html29 = '<div class="help_col show">\
                <p>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>登录密码验证</strong>：用户名称与登录密码必须完全一致，才可使用提款功能。\
                    <br><br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>真实身份核对</strong>：您绑定的银行卡的真实姓名必须和您在彩彩客彩票网注册时填写的真实姓名一致，否则将无法提款。\
                    <br><br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>真实资料安全</strong>：真实姓名、银行卡信息绑定后，不允许用户私自修改，若要修改，需联系客服人员并提供身份证明资料方可修改。\
                    <br><br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>用户信息保密</strong>：您注册时所填写的真实姓名及您绑定的银行卡号，填写成功后，在个人资料中都无法查看到。\
                    <br><br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您的每一笔提款都需经过我们财务人员一一核对，核对无误后方可办理汇款。\
                    <br><br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：为保障用户的合法权益，避免在中奖时因用户注册资料与真实情况不符而发生纠纷，请用户注册时务必按照真实、全面、准确的原则填写注册信息和实名信息。\
            </p></div>';
var html30 = '<div class="help_col show">\
                <p>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本站承诺对用户的隐私信息绝对保密。未经用户授权或同意，不得擅自将用户信息用于处理用户委托自购行为以外的其他活动。同时，用户务必对其用户密码、个人账号等信息自行保密，免被盗用或篡改。用户若发现任何非法使用用户账号或安全漏洞的情况，请立即与本站联系。\
                    <br><br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;投注后，本站对所有中奖用户的真实信息进行完全的保密处理，除本站负责提款程序的相关工作人员外，其他任何本站注册用户、非本站注册用户、本站不负责提款的工作人员均无法看到中奖用户的真实信息。对于中奖金额特别巨大的大奖用户，本站可以根据客户的实际要求，提供更加严格的保密措施。\
                </p>\
            </div>';
var html31 = '<div class="help_col show">\
                <p>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;彩彩客彩票网（www.caicaike.com），是一家专注于的网络彩票投注和服务的互联网公司。<br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们立志通过互联网的技术应用和专心致志的服务理念，确保能为您提供一个便捷、安全、高效、专业的购彩平台。</p>\
                <p>\
                    <strong>一、购彩便捷，玩法丰富</strong> <br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;彩彩客彩票网现提供全国主流彩票在线业务，您只需在彩彩客彩票网注册一个账户，投注、兑奖、提现都可轻松完成！</p>\
                <p><strong>二、资深团队，确保服务专业</strong> <br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;彩彩客彩票网团队均有资深行业从业经验和强大的技术背景优势，为用户提供专业、高效和便捷的交易环境。确保平台能每天24小时持续运营，为客户不间断提供专业化服务。</p>\
                <p><strong>三、网银充值与提款均不收取手续费</strong> <br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们推出“网银零手续费”服务标准，您可以选择网上银行支付，所产生的转账费用由本站承担，您支付多少即到帐多少。正常提款本站也不收取任何提款手续费。</p>\
                <p><strong>四、提款全网快速到账</strong> <br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提款处理时间：本站09：30-17：30为您处理提款（如遇法定节假日，提款处理时间公告通知用户）。 银行到账时间：正常提款，最快10分钟到账，所有银行预计24小时可到账。节假日因银行系统处理不及时造成的延误，预计在假期后第一个工作日到账。</p>\
                <p><strong>五、多层账户安全，确保投注无忧</strong> <br>\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;每个购彩账户需要绑定真实的身份信息和银行卡信息方可提款，一旦绑定后不允许自行修改，多层次技术比对，可确保账户资金安全。</p>\
            </div>';



var html32 = '<div class="help_col show">\
				<p>\
				    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请及时提供相应信息给客服。系统将重置一个新密码，并把新密码发送到用户注册时提交的电子邮箱中，为保障账户安全，建议用户登录后立即修改密码。\
				</p>\
            </div>';
var html33 = '<div class="help_col show">\
				<p>\
				    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;忘记用户名可以通过联系我们的客服人员帮您找回。（在线咨询、客服热线） 需要您提供在彩彩客彩票网网曾经填写过的个人信息，如：真实姓名、手机号码 等来进行查询。因此请您在注册时务必完善此类信息，并确保填写无误。\
				</p>\
            </div>';
var html34 = '<div class="help_col show">\
				<p>\
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请先确认您输入的内容是否和图片显示的相符，切记您在输入数字时中间不能使用空格。 如果您确认输入正确，再查看是否是以下原因：\
				</p>\
                <p>\
                    <strong>（1）您使用了错误的输入法输入</strong>：\
                </p>\
                <p>\
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请先确认您使用的输入法是否为英文的半角状态， 因为只有在半角状态下输入数字及英文字母，校验码才有效， 否则系统会提示您"验证码输入错误，请重新输入" 。\
                </p>\
                <p>\
                    <strong>（2）您的浏览器不能正确地显示验证码图片</strong>：\
                </p>\
                <p>\
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果您的验证码显示不完全或者看不清楚，请尝试刷新页面，如果还是不能正常显示，请按如下步骤调整您的IE浏览器设置。\
                </p>\
                <p>\
                    第一步、打开浏览器，选择菜单中的"<span style="color:#E53333;">工具</span>"→"<span style="color:#E53333;">Internet"选项</span>\
                </p>\
                <p style="text-align: center">\
                <a href="images/1.png"><img width="435" src="images/1.png"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <br>\
                <p>\
                    第二步、选择"<span style="color:#E53333;">常规</span>"中"<span style="color:#E53333;">浏览历史纪录</span>"的"<span style="color:#E53333;">删除</span>"，并且勾选"<span style="color:#E53333;">临时文件与Cookie</span>"选项。 然后点击“<span style="color:#E53333;">删除</span>”\
                </p>\
                <p style="text-align: center">\
                <a href="images/2.png"><img width="424" src="images/2.png"></a>\
                </p>\
                <p style="text-align: center">\
                <a href="images/3.png"><img width="396" src="images/3.png"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <br>\
                <p>\
                第三步，关闭浏览器，重新打开网页再做尝试。\
                </p>\
            </div>';
var html35 = '<div class="help_col show">\
                    <p>\
                        请联系客服人员进行修改（需根据客服要求提供资料进行验证）。\
                    </p>\
            </div>';
var html36 = '<div class="help_col show">\
				<p>\
				    进入彩彩客彩票网站后，点击首页的“帮助”后进入玩法规则页面，选择想要投注的彩种并查看其详细玩法。\
				</p>\
            </div>';
var html37 = '<div class="help_col show">\
				<p>\
				    <strong>第一步</strong>：登录个人账户后，点击“<span style="color:#E53333;">购彩大厅</span>”或“<span style="color:#E53333;">购买彩票</span>”等字样，进入购彩大厅。或直接找到喜欢的彩种进入投注界面。\
				</p>\
                <p style="text-align: center">\
                <a href="images/main/gc1.jpg"><img width="700" src="images/main/gc1.jpg"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <br>\
                <p><strong>第二步</strong>：进入大厅，可以点击左侧列表彩种名称，进入该彩种投注。或者点击需要彩种的“<span style="color:#E53333;">立即投注</span>”。进行投注。以重庆时时彩为例。</p>\
                <p style="text-align: center">\
                <a href="images/main/gc2.jpg"><img width="700" src="images/main/gc2.jpg"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <br>\
                <p>\
                <strong>第三步</strong>：进入投注界面后，选择喜欢的玩法，以投注一字定万位为例，如图：点击一字定位，在快捷金额中输入每注的金额。选择要投注的号码。选好后，点击提交。也可直接在对应号码的金额输入框内直接输入金额。\
                </p>\
                <p>\
                <a href="images/main/gc3.jpg"><img src="images/main/gc3.jpg" width="700"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
                <br>\
                <p>\
                    <strong>第四步</strong>：对照下注清单后，点击确定。\
                </p>\
                <p>\
                <a href="images/main/gc4.png"><img src="images/main/gc4.png" width="700"></a>\
                </p>\
                <h3 style="text-align: center;color: #fa4100">(点击图片放大) &nbsp;↑</h3>\
            </div>';
var registrArr = [['如何免费注册成为会员?',html1],['注册时用户需要注意什么?',html2],['是否可以注册多个账号？',html3],['注册后为什么要绑定银行卡？',html4],['真实姓名填写错误如何修改？',html5],['如何设置提现密码？',html6],['如何修改密码？',html7],['未成年人购彩限制的说明',html8]];
var rechargeArr = [['如何进行银行转账充值？',html9],['如何用支付宝在线支付?',html10],['如何用微信进行扫码支付？',html11],['网站有哪些充值方式？',html12],['充值后多久可以到账？',html13],['充值未到账？',html14],['账户充值会收手续费吗？',html15],['银行转账未及时到账？',html16],['如何开通网上银行？',html17]];
var drawArr = [['中奖后怎么兑奖？',html18],['提款须知',html19],['为什么我的提款不成功？',html20],['申请提款，网站是否有通知？',html21],['如何提款？',html22],['是否收取提款手续费？',html23],['提款金额有没有限制？',html24],['提款次数有没有限制？',html25],['提款不成功怎么办？',html26],['中奖查询',html27]];
var safeArr = [['购彩支付和充值安全',html28],['账户资金安全',html29],['个人隐私安全',html30],['购彩优势',html31]];
var hotArr = [['忘记了登录密码怎么办？',html32],['忘记用户名怎么办？',html33],['登录时验证码输入是对的，为什么提示输入错误？',html34],['如何修改绑定的联系电话？',html35],['我从来没买过彩票，这些彩种都怎么玩？',html36],['购彩的流程是什么样的？',html37]];
if( type == 1 && no ==1){
    title = '关于注册';
    navTitle= '新手指南';
}else if( type == 2){
    title = '关于充值';
    navTitle= '新手指南';
}else if ( type == 3){
    title = '关于提款';
    navTitle= '新手指南';
};