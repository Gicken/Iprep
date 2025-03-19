from app import create_app

app = create_app()

if __name__ == "__main__":
    print("SERVER IS UP AND RUNNING, READY TO ACCEPT REQUESTS! CHEERS!!")
    app.run(debug=True)
