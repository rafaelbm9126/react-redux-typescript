variable "do_token" {}

variable "do_project_name" {}

variable "do_machine_name" {}

variable "do_ssh_keys" {}

variable "do_priv_key" {}

variable "do_env" {}

variable "do_credential" {}

# variable "do_folder_ssl" {}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_droplet" "app" {
  name        = var.do_machine_name
  image       = "ubuntu-18-04-x64"
  region      = "nyc1"
  size        = "s-1vcpu-1gb"
  resize_disk = false
  backups     = false
  ssh_keys    = [var.do_ssh_keys]

  connection {
    type        = "ssh"
    private_key = file(var.do_priv_key)
    user        = "root"
    timeout     = "2m"
    host        = self.ipv4_address
  }

  provisioner "file" {
    source      = var.do_env
    destination = "/home/.env"
  }

  # provisioner "file" {
  #   source      = var.do_folder_ssl
  #   destination = "/etc/ssl"
  # }

  provisioner "file" {
    source      = "nginx.conf"
    destination = "/home/nginx.conf"
  }

  provisioner "file" {
    source      = "deploy.mk"
    destination = "/home/deploy.mk"
  }

  provisioner "file" {
    source      = var.do_credential
    destination = "/home/credential.json"
  }

  provisioner "file" {
    source      = "script.sh"
    destination = "/tmp/script.sh"
  }

  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/script.sh",
      "/tmp/script.sh args",
    ]
  }
}

resource "digitalocean_project" "project" {
  name        = var.do_project_name
  description = "This is a project in DigitalOcean"
  purpose     = "Web Application"
  environment = "Development"
  resources   = [digitalocean_droplet.app.urn]
}
