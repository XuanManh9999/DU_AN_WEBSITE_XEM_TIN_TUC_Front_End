import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input, Typography, Modal, message } from "antd";
import {
  MailOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import URL from "../../../utils/url";
const { Title, Text } = Typography;

export default function ForgotPassword() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(90);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [email, setEmail] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    let interval = null;
    if (isCountdownActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCountdownActive(false);
    }
    return () => clearInterval(interval);
  }, [isCountdownActive, countdown]);

  const onFinish = (values) => {
    console.log("Email submitted: ", values.email);
    setEmail(values.email);
    setIsModalVisible(true);
    setCountdown(90);
    setIsCountdownActive(true);
    message.success("Mã OTP đã được gửi đến email của bạn!");
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpSubmit = () => {
    const otpCode = otpValues.join("");
    if (otpCode.length === 6) {
      console.log("OTP submitted: ", otpCode);
      message.success(
        "Xác thực thành công! Vui lòng kiểm tra email để đặt lại mật khẩu."
      );
      setIsModalVisible(false);
      // Reset form
      setOtpValues(["", "", "", "", "", ""]);
      setIsCountdownActive(false);
    } else {
      message.error("Vui lòng nhập đầy đủ 6 số OTP!");
    }
  };

  const handleResendOtp = () => {
    setCountdown(90);
    setIsCountdownActive(true);
    setOtpValues(["", "", "", "", "", ""]);
    message.success("Mã OTP mới đã được gửi!");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex">
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-pink-700/90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Forgot Password Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
          <div className="max-w-md text-center">
            <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
              Khôi phục
              <br />
              <span className="text-yellow-300">Mật khẩu</span>
            </h1>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Đừng lo lắng! Chúng tôi sẽ giúp bạn lấy lại quyền truy cập vào tài
              khoản một cách an toàn
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">🔒</div>
                <div className="opacity-80">Bảo mật</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">⚡</div>
                <div className="opacity-80">Nhanh chóng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">✅</div>
                <div className="opacity-80">Đáng tin cậy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          <Card
            className="shadow-2xl border-0 rounded-2xl overflow-hidden"
            bodyStyle={{ padding: "48px 40px" }}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MailOutlined className="text-white text-2xl" />
              </div>
              <Title level={2} className="!mb-2 !text-gray-800">
                Quên mật khẩu?
              </Title>
              <Text className="text-gray-500 text-base">
                Nhập email để nhận mã khôi phục
              </Text>
            </div>

            <Form
              name="forgotPassword"
              onFinish={onFinish}
              layout="vertical"
              size="large"
              className="space-y-1">
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ!",
                  },
                ]}>
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="Địa chỉ email của bạn"
                  className="rounded-lg border-gray-200 hover:border-purple-400 focus:border-purple-500 py-3"
                />
              </Form.Item>

              <Form.Item className="!mb-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 border-0 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  Gửi mã xác thực
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <Link
                to={URL.AUTH.LOGIN}
                className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-700 font-medium">
                <ArrowLeftOutlined />
                Quay lại đăng nhập
              </Link>
            </div>
          </Card>

          <div className="text-center mt-6">
            <Text className="text-gray-400 text-sm">
              Bạn sẽ nhận được email chứa hướng dẫn khôi phục mật khẩu trong
              vòng vài phút
            </Text>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <Modal
        title={null}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width={400}
        className="otp-modal">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircleOutlined className="text-white text-2xl" />
          </div>

          <Title level={3} className="!mb-2">
            Xác thực OTP
          </Title>

          <Text className="text-gray-500 block mb-6">
            Mã xác thực đã được gửi đến
            <br />
            <strong>{email}</strong>
          </Text>

          <div className="flex justify-center gap-3 mb-6">
            {otpValues.map((value, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                value={value}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold rounded-lg border-2 border-gray-200 focus:border-purple-500"
                maxLength={1}
              />
            ))}
          </div>

          <div className="mb-6">
            {isCountdownActive ? (
              <Text className="text-gray-500">
                Gửi lại mã sau:{" "}
                <span className="font-bold text-purple-600">
                  {formatTime(countdown)}
                </span>
              </Text>
            ) : (
              <Button
                type="link"
                onClick={handleResendOtp}
                className="text-purple-500 hover:text-purple-700 font-medium p-0">
                Gửi lại mã OTP
              </Button>
            )}
          </div>

          <Button
            type="primary"
            onClick={handleOtpSubmit}
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 border-0 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300">
            Xác thực
          </Button>
        </div>
      </Modal>
    </div>
  );
}
