
const Aboutus = ({userInfo}) => {
  return (
    <div className="space-y-6">
            <section className="space-y-2">
              <h3 className="text-lg font-bold">About us</h3>
              <p className="text-muted-foreground leading-relaxed">
                {userInfo?.about_us}
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-bold">Details</h3>
              <div className="text-sm space-y-1">
                <p>
                  <span className="text-muted-foreground">Location:</span>{" "}
                  United States
                </p>
                <p>
                  <span className="text-muted-foreground">Joined:</span>{" "}
                  {userInfo?.create_at
                    ? new Date(userInfo.create_at).toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : "Unknown"}
                </p>
                <p>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {userInfo?.email}
                </p>
              </div>
            </section>
          </div>
  )
}

export default Aboutus