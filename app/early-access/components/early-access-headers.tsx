const EarlyAccessHeaders = () => {
  return (
    <div className="flex flex-col items-center lg:space-y-14 space-y-5 max-w-4xl text-center lg:pt-0 pt-14 w-full">
      <h1 className="lg:text-4xl text-lg font-semibold text-c_grey italic">
        Your Early Access trial has been completed. Thank you for using our app.
      </h1>
      <p className="lg:text-sm text-xs font-light italic text-transparent bg-clip-text bg-gradient-to-r from-c_grey to-neutral-500">
        When the app officially lanches, you&apos;ll recieve a notification via
        Email.
      </p>
      <p
        className="lg:text-2xl text-base font-medium
       text-c_grey italic"
      >
        Before you go, please consider leaving us a feedback regarding our
        experience. It will help us improve our app.
      </p>
      <p className="lg:text-base text-xs font-light italic text-transparent bg-clip-text bg-gradient-to-r from-c_grey to-neutral-500">
        If feedback is provided, we&apos;ll reset your free credits when the app
        officially launches.
      </p>
    </div>
  );
};

export default EarlyAccessHeaders;
